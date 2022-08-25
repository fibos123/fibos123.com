import useSWR from "swr";
import { api } from "../config";
import { IEosIoChainGetTableRows } from "../types";
import { post } from "../utils";

export const useEosIoChainGetTableRows = <T>(body: any, refresh = false) => {
  const refreshInterval = refresh ? 1000 : 0;
  const dedupingInterval = 500;
  const key = api.rpcGetTableRows + "?" + JSON.stringify(body);
  const { data, error } = useSWR<IEosIoChainGetTableRows<T>>(key, post(api.rpcGetTableRows, body), { refreshInterval, dedupingInterval });

  return {
    data,
    isLoading: error && !data,
    isError: error,
  };
};
