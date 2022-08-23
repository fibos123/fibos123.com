import { Row as ProducerRow } from "./Producer";
import { BpJson } from "./BpJson";

export interface BpList {
  owner: string,
  candidate_name: string,
  logo: string,
  staked: number,
  claim_rewards_total: number,
  claim_rewards_unreceived: number,
  weight_percent: number,
  urlFull: string,
  urlSimple: string,
  producer: ProducerRow
  json: BpJson | undefined
}