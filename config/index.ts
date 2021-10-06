const api_endpoint = "https://api.fibos123.com";
const rpc_endpoint = "https://api.fibos.rocks"; // thanks FIBOS ROCKS
const config = {
  api_endpoint,
  api_bp_status: api_endpoint + "/bp_status",
  rpc_endpoint,
  rpc_get_table_rows: rpc_endpoint + "/v1/chain/get_table_rows",
  rpc_get_info: rpc_endpoint + "/v1/chain/get_info",
  rpc_get_account: rpc_endpoint + "/v1/chain/get_account",
  rpc_get_transaction: rpc_endpoint + "/v1/chain/get_transaction",
}

export default config;