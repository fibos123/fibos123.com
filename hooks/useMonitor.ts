import { useGet } from "./useGet";
import { api } from "../config";
import { IProducerStatus } from "../types";
import { formatDate, formatNumber } from "../utils";

export const useMonitor = (refresh = false) => {
  const { data, isLoading, isError } = useGet<IProducerStatus, any>({ url: api.apiBpStatus, refresh });

  const monitors = [
    {
      name: "生产者",
      value: data && !isError ? data.head_block_producer : "",
    },
    {
      name: "出块时间",
      value: data && !isError ? formatDate(data.head_block_time) : "",
    },
    {
      name: "最新区块",
      value: data && !isError ? formatNumber(data.head_block_num) : "",
    },
  ];

  return { monitors, producerStatus: data, isLoading, isError };
};
