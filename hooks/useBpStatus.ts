import _ from "lodash";
import useSWR from "swr";
import config from "../config";
import { IBpStatus } from "../types";
import utils from "../utils";
import { get } from "../utils/api";

export const useBpStatus = () => {
  const refreshInterval = 1000;
  const dedupingInterval = 500;

  const { data, error } = useSWR<IBpStatus>(config.api_bp_status, get, { refreshInterval, dedupingInterval });

  const card = [
    {
      name: "生产者",
      value: data && !error ? data.head_block_producer : "",
    },
    {
      name: "出块时间",
      value: data && !error ? utils.formatDate(data.head_block_time + "Z") : "",
    },
    {
      name: "最新区块",
      value: data && !error ? utils.formatNumber(data.head_block_num) : "",
    },
  ];

  return {
    card,
    bpStatus: data,
    isLoading: error && !data,
    isError: error,
  };
};
