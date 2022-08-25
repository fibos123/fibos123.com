import { useProducerInfo, useProducers } from ".";

export const useBpListPage = () => {
  const { info } = useProducerInfo();
  const { bpList } = useProducers();

  return { info, bpList };
};
