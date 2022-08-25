import useSWR from "swr";
import { api } from "../config";
import { IEosIoChainGetTableRows } from "../types";
import { post } from "../utils";

export const useEosIoChainGetTableRows = <T>(body: any) => {
  const key = api.rpcGetTableRows + "?" + JSON.stringify(body);
  const { data, error } = useSWR<IEosIoChainGetTableRows<T>>(key, post(api.rpcGetTableRows, body));

  return {
    data,
    isLoading: error && !data,
    isError: error,
  };
};
