import useSWR from "swr";
import config from "../config";
import { IEosIoChainGetAccount } from "../types";
import { post } from "../utils/api";

export const useEosIoChainGetAccount = (account_name: string, refresh = false) => {
  const refreshInterval = refresh ? 1000 : 0;
  const dedupingInterval = 500;
  const body = { account_name };
  const key = config.rpc_get_table_rows + "?" + JSON.stringify(body);
  const { data, error } = useSWR<IEosIoChainGetAccount>(key, post(config.rpc_get_account, body), { refreshInterval, dedupingInterval });
  const account = data;

  return {
    account,
    isLoading: error && !data,
    isError: error,
  };
};
