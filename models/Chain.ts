import { fetcherPost } from "../utils/api";
import config from "../config";
import { IAccount, IBpList, IGlobalRow, IProducerJsonRow, IProducerRow } from "../types";

class Chain {
  static votesToStaked = (totalVotes: number): number => {
    if (totalVotes === 0) return 0;
    const e: number = Date.now() / 1000 - 946684800;
    const s: number = Math.floor(e / 604800) / 52;
    const r: number = totalVotes / 2 ** s / 10000;
    return Math.round(r);
  };

  static getClaimRewards = (producer: IProducerRow, global: IGlobalRow, rank: number) => {
    if (!global.perblock_bucket) {
      return {
        total: 0,
        unreceived: 0,
      };
    }
    const block_pay = (global.perblock_bucket * producer.unpaid_blocks) / global.total_unpaid_blocks / 10000;
    const vote_pay = (global.pervote_bucket * parseInt(producer.total_votes)) / parseInt(global.total_producer_vote_weight) / 10000;
    const multiple = 1;
    const block_pay_fix = rank <= 21 ? 320 * multiple : block_pay;
    const total = block_pay_fix + vote_pay >= 100 * multiple ? block_pay_fix + vote_pay : 0;
    const next_claim_time = (1 * producer.last_claim_time) / 1000 + 24 * 60 * 60 * 1000;
    const unreceived = next_claim_time > Date.now() ? 0 : total;
    return {
      total: Math.round(total),
      unreceived: Math.round(unreceived),
    };
  };

  static getGlobal = async (): Promise<IGlobalRow> => {
    const response = await fetcherPost(config.rpc_get_table_rows, {
      code: "eosio",
      json: true,
      limit: 1,
      scope: "eosio",
      table: "global",
    });
    const data = response?.rows[0] || {};
    return data;
  };

  static getProducers = async (): Promise<IProducerRow[]> => {
    const response = await fetcherPost(config.rpc_get_table_rows, {
      scope: "eosio",
      code: "eosio",
      table: "producers",
      json: true,
      limit: 100,
      key_type: "float64",
      index_position: 2,
    });
    const data = response?.rows || [];
    return data;
  };

  static getProducerJson = async (): Promise<IProducerJsonRow[]> => {
    const response = await fetcherPost(config.rpc_get_table_rows, {
      json: true,
      code: "producerjson",
      scope: "producerjson",
      table: "producerjson",
      limit: 1000,
    });
    const data = response?.rows || [];
    return data;
  };

  static getAccount = async (account_name: string): Promise<IAccount> => {
    const response = await fetcherPost(config.rpc_get_account, { account_name });
    const data = response;
    return data;
  };

  static generateBpList(producers: IProducerRow[], producerJson: IProducerJsonRow[], global: IGlobalRow): IBpList[] {
    let bpList: IBpList[] = [];

    producers.forEach((item) => {
      bpList.push({
        owner: item.owner,
        candidate_name: "",
        logo: "",
        staked: 0,
        claim_rewards_total: 0,
        claim_rewards_unreceived: 0,
        weight_percent: 0,
        urlFull: "",
        urlSimple: "",
        json: undefined,
        producer: item,
      });
    });

    bpList.map((item, index) => {
      item.staked = this.votesToStaked(parseInt(item.producer.total_votes));
      const claimRewards = this.getClaimRewards(item.producer, global, index + 1);
      item.claim_rewards_total = claimRewards.total;
      item.claim_rewards_unreceived = claimRewards.unreceived;
      item.weight_percent = (parseInt(item.producer.total_votes) / parseInt(global.total_producer_vote_weight)) * 100;
      try {
        const url = new URL(item.producer.url).origin;
        if (url) {
          item.urlFull = item.producer.url;
          item.urlSimple = url;
        }
      } catch (err) {}

      const jsonFile = producerJson.find((item2) => item2.owner === item.owner);
      if (jsonFile) {
        try {
          const json = JSON.parse(jsonFile.json);
          item.candidate_name = json?.org?.candidate_name || "";
          const logo = json?.org?.branding?.logo_256 || "";
          if (logo && logo.substring(0, 8) === "https://") {
            item.logo = logo;
          }
          item.json = json;
        } catch (err) {
          console.info(err);
        }
      }
      return item;
    });
    return bpList;
  }
}

export default Chain;
