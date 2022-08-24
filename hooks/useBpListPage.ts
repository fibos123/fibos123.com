import { useBpInfo, useBpList } from ".";

export const useBpListPage = () => {
  const { info } = useBpInfo();
  const { bpList } = useBpList();

  return { info, bpList };
};
