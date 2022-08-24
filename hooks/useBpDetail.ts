import { useState, useEffect } from "react";
import Chain from "../models/Chain";
import utils from "../utils";

interface IDetail {
  title: string;
  list: {
    key: string;
    value: string;
  }[];
}

export const useBpDetail = (account: string) => {
  const [detail, setDetail] = useState<IDetail[]>([]);

  useEffect(() => {
    async function fetchDetail() {
      if (!account || "string" !== typeof account) {
        console.error("not account");
        return;
      }
      const accountInfo = await Chain.getAccount(account);

      // @ts-ignore
      const [producers, producerJson, global] = await Promise.all<[ProducerRow[], ProducerJsonRow[], GlobalRow]>([Chain.getProducers(), Chain.getProducerJson(), Chain.getGlobal()]);

      const bpList = Chain.generateBpList(producers, producerJson, global);
      const bp = bpList.find((item) => item.owner === account);
      if (!bp) {
        console.log("not bp");
        return;
      }

      let detail: IDetail[] = [
        {
          title: "基本信息",
          list: [
            {
              key: "创建时间",
              value: utils.formatDate(accountInfo.created + "Z"),
            },
            {
              key: "排名",
              value: (bpList.findIndex((item) => item.owner === account) + 1).toString(),
            },
            {
              key: "得票率",
              value: utils.formatPercent(bp.weight_percent) + " %",
            },
            {
              key: "有效票数",
              value: utils.formatNumber(bp.staked) + " FO",
            },
            {
              key: "得票权重",
              value: utils.formatNumber(parseInt(bp.producer.total_votes)),
            },
          ],
        },
        {
          title: "收益信息",
          list: [
            {
              key: "每日收益",
              value: utils.formatNumber(bp.claim_rewards_total) + " FO",
            },
            {
              key: "未领取收益",
              value: utils.formatNumber(bp.claim_rewards_unreceived) + " FO",
            },
            {
              key: "未支付块",
              value: utils.formatNumber(bp.producer.unpaid_blocks),
            },
            {
              key: "上次领取时间",
              value: utils.formatDate(bp.producer.last_claim_time / 1000),
            },
          ],
        },
      ];
      if (bp.json) {
        let list = [];
        let list2 = [];
        for (const key in bp.json.org) {
          list.push({
            key: key,
            value: "object" === typeof bp.json.org[key] ? JSON.stringify(bp.json.org[key]) : bp.json.org[key],
          });
        }
        detail.push({
          title: "JSON 信息",
          list,
        });

        const producer = bp.json.nodes.find((item) => item.node_type === "producer");
        const full = bp.json.nodes.find((item) => item.node_type === "full");
        const seed = bp.json.nodes.find((item) => item.node_type === "seed");
        if (producer) {
          list2.push({
            key: "producer",
            value: `国家或地区：
${producer.location.name}, ${producer.location.country}`,
          });
        }
        if (full) {
          list2.push({
            key: "full",
            value: `国家或地区：
${full.location.name}, ${full.location.country}
接入点地址：
${full.api_endpoint}
${full.ssl_endpoint}`,
          });
        }
        if (seed) {
          list2.push({
            key: "seed",
            value: `国家或地区：
${seed.location.name}, ${seed.location.country}
接入点地址：
${seed.p2p_endpoint}`,
          });
        }
        detail.push({
          title: "接入点信息",
          list: list2,
        });
      } else {
        detail.push({
          title: "JSON 信息",
          list: [
            {
              key: "该节点未设置 JSON",
              value: "",
            },
          ],
        });
      }
      setDetail(detail);
    }
    fetchDetail();
  }, [account]);

  return {
    detail,
  };
};
