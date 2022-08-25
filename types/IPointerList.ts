import { EndPointStatus } from "../enums";

export interface IPointerList {
  owner: string;
  api_endpoint: string;
  ssl_endpoint: string;
  p2p_endpoint: string;
  number: number;
  version: string;
  status: EndPointStatus;
}
