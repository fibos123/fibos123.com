import useSWR from "swr";
import config from "../config";
import { IEosIoChainGetInfo } from "../types";
import { get } from "../utils/api";

export const useEosIoChainGetInfo = (refresh = false) => {
  const refreshInterval = refresh ? 1000 : 0;
  const dedupingInterval = 500;
  const { data, error } = useSWR<IEosIoChainGetInfo>(config.rpc_get_info, get, { refreshInterval, dedupingInterval });
  const info = data;
  return {
    info,
    isLoading: error && !data,
    isError: error,
  };
};
