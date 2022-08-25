const apiEndpoint = "https://api.fibos123.com";
const rpcEndpoint = "https://to-rpc.fibos.io";
export const api = {
  apiEndpoint: apiEndpoint,
  apiBpStatus: apiEndpoint + "/bp_status",
  rpcEndpoint: rpcEndpoint,
  rpcGetTableRows: rpcEndpoint + "/v1/chain/get_table_rows",
  rpcGetInfo: rpcEndpoint + "/v1/chain/get_info",
  rpcGetAccount: rpcEndpoint + "/v1/chain/get_account",
};
