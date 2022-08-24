import { useState, useEffect } from "react";
import { IBpList } from "../interfaces/IBpList";
import Chain from "../models/Chain";

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
