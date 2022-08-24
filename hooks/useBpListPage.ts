import { useState, useEffect } from "react";
import useSWR from "swr";
import config from "../config";
import Chain from "../models/Chain";
import { IBpList, IInfo } from "../types";
import utils from "../utils";
import { get } from "../utils/api";

export const useBpInfo = () => {
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

export const useBpList = () => {
  const [bpList, setBpList] = useState<IBpList[]>([]);
  useEffect(() => {
    async function fetchBpList() {
      // @ts-ignore
      const [producers, producerJson, global] = await Promise.all<[ProducerRow[], ProducerJsonRow[], GlobalRow]>([Chain.getProducers(), Chain.getProducerJson(), Chain.getGlobal()]);
      const bpList = Chain.generateBpList(producers, producerJson, global);
      setBpList(bpList);
    }
    fetchBpList();
  }, []);
  return { bpList };
};

export const useBpListPage = () => {
  const { info } = useBpInfo();
  const { bpList } = useBpList();

  return { info, bpList };
};
