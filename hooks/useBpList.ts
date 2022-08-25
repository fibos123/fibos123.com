import { useState, useEffect } from "react";
import { useEosIoChainGetGlobal, useEosIoChainGetProducerJson, useEosIoChainGetProducers } from ".";
import Chain from "../models/Chain";
import { IBpList } from "../types";

export const useBpList = () => {
  const [bpList, setBpList] = useState<IBpList[]>([]);
  const { global } = useEosIoChainGetGlobal();
  const { producers } = useEosIoChainGetProducers();
  const { producerJson } = useEosIoChainGetProducerJson();

  useEffect(() => {
    if (global && producers && producerJson) {
      const bpList = Chain.generateBpList(producers, producerJson, global);
      setBpList(bpList);
    }
  }, [global, producers, producerJson]);
  return { bpList };
};
