import { api } from "../config";
import { IEosIoChainGetTableRows } from "../types";
import { useGet } from "./useGet";

export const useEosIoChainGetTableRows = <T>(body: any) => {
  const key = api.rpcGetTableRows + "?" + JSON.stringify(body);
  const { data, isLoading, isError } = useGet<IEosIoChainGetTableRows<T>, any>({ url: api.rpcGetTableRows, method: "POST", body });

  return { data, isLoading, isError };
};
