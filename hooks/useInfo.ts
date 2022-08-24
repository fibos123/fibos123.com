import _ from "lodash";
import useSWR from "swr";
import config from "../config";
import { IInfo } from "../interfaces/IInfo";
import utils from "../utils";
import { get } from "../utils/api";

export const useInfo = () => {
  const refreshInterval = 1000;
  const dedupingInterval = 500;

  const { data, error } = useSWR<IInfo>(config.rpc_get_info, get, { refreshInterval, dedupingInterval });

  const info = [
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
    {
      name: "不可逆区块",
      value: data && !error ? utils.formatNumber(data.last_irreversible_block_num) : "",
    },
  ];

  return {
    info,
    isLoading: error && !data,
    isError: error,
  };
};
