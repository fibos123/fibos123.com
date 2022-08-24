export interface IPointerList {
  owner: string;
  api_endpoint: string;
  ssl_endpoint: string;
  p2p_endpoint: string;
  number: number;
  version: string;
  status: "waiting" | "success" | "fail" | "notset";
}
