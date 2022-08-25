import useSWR from "swr";
import { api } from "../config";
import { IEosIoChainGetAccount } from "../types";
import { post } from "../utils";

export const useEosIoChainGetAccount = (account_name: string, refresh = false) => {
  const refreshInterval = refresh ? 1000 : 0;
  const dedupingInterval = 500;
  const body = { account_name };
  const key = api.rpcGetTableRows + "?" + JSON.stringify(body);
  const { data, error } = useSWR<IEosIoChainGetAccount>(key, post(api.rpcGetAccount, body), { refreshInterval, dedupingInterval });
  const account = data;

  return {
    account,
    isLoading: error && !data,
    isError: error,
  };
};
