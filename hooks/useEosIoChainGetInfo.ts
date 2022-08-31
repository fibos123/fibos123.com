import { useGet } from "./useGet";
import { api } from "../config";
import { IEosIoChainGetInfo } from "../types";

export const useEosIoChainGetInfo = (refresh = false) => {
  const { data, isLoading, isError } = useGet<IEosIoChainGetInfo, any>({ url: api.rpcGetInfo, refresh });
  const info = data;

  return { info, isLoading, isError };
};
