import { IEosIoChainGetProducers } from "./IEosIoChainGetProducers";
import { IBpJson } from "./IBpJson";

export interface IBpList {
  owner: string;
  candidate_name: string;
  logo: string;
  staked: number;
  claim_rewards_total: number;
  claim_rewards_unreceived: number;
  weight_percent: number;
  urlFull: string;
  urlSimple: string;
  producer: IEosIoChainGetProducers;
  json: IBpJson | undefined;
}
