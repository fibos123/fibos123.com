import useSWR from "swr";
import { api } from "../config";
import { IProducerStatus } from "../types";
import { formatDate, formatNumber } from "../utils";
import { get } from "../utils";

export const useProducerStatus = () => {
  const refreshInterval = 1000;
  const dedupingInterval = 500;

  const { data, error } = useSWR<IProducerStatus>(api.apiBpStatus, get, { refreshInterval, dedupingInterval });

  const card = [
    {
      name: "生产者",
      value: data && !error ? data.head_block_producer : "",
    },
    {
      name: "出块时间",
      value: data && !error ? formatDate(data.head_block_time) : "",
    },
    {
      name: "最新区块",
      value: data && !error ? formatNumber(data.head_block_num) : "",
    },
  ];

  return {
    card,
    producerStatus: data,
    isLoading: error && !data,
    isError: error,
  };
};
