import useSWR from "swr";
import config from "../config";
import { IEosIoChainGetTableRows } from "../types";
import { post } from "../utils/api";

export const useEosIoChainGetTableRows = <T>(body: any, refresh = false) => {
  const refreshInterval = refresh ? 1000 : 0;
  const dedupingInterval = 500;
  const key = config.rpc_get_table_rows + "?" + JSON.stringify(body);
  const { data, error } = useSWR<IEosIoChainGetTableRows<T>>(key, post(config.rpc_get_table_rows, body), { refreshInterval, dedupingInterval });

  return {
    data,
    isLoading: error && !data,
    isError: error,
  };
};
