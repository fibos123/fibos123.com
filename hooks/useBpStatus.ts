import useSWR from "swr";
import { api } from "../config";
import { IBpStatus } from "../types";
import { formatDate, formatNumber } from "../utils";
import { get } from "../utils";

export const useBpStatus = () => {
  const refreshInterval = 1000;
  const dedupingInterval = 500;

  const { data, error } = useSWR<IBpStatus>(api.apiBpStatus, get, { refreshInterval, dedupingInterval });

  const card = [
    {
      name: "生产者",
      value: data && !error ? data.head_block_producer : "",
    },
    {
      name: "出块时间",
      value: data && !error ? formatDate(data.head_block_time + "Z") : "",
    },
    {
      name: "最新区块",
      value: data && !error ? formatNumber(data.head_block_num) : "",
    },
  ];

  return {
    card,
    bpStatus: data,
    isLoading: error && !data,
    isError: error,
  };
};
