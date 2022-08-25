import { useEosIoChainGetInfo } from ".";
import utils from "../utils";

export const useBpInfo = () => {
  const { info: data, isLoading, isError } = useEosIoChainGetInfo(true);

  const info = [
    {
      name: "生产者",
      value: data && !isError ? data.head_block_producer : "",
    },
    {
      name: "出块时间",
      value: data && !isError ? utils.formatDate(data.head_block_time + "Z") : "",
    },
    {
      name: "最新区块",
      value: data && !isError ? utils.formatNumber(data.head_block_num) : "",
    },
    {
      name: "不可逆区块",
      value: data && !isError ? utils.formatNumber(data.last_irreversible_block_num) : "",
    },
  ];

  return {
    info,
    isLoading: isLoading,
    isError: isError,
  };
};
