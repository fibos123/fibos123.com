import { useState, useEffect } from "react";
import { useEosIoChainGetGlobal, useEosIoChainGetProducerJson, useEosIoChainGetProducers } from ".";
import { IProducer } from "../types";
import { getProducers } from "../utils";

export const useProducers = () => {
  const [bpList, setBpList] = useState<IProducer[]>([]);
  const { global } = useEosIoChainGetGlobal();
  const { producers } = useEosIoChainGetProducers();
  const { producerJson } = useEosIoChainGetProducerJson();

  useEffect(() => {
    if (global && producers && producerJson) {
      const bpList = getProducers(producers, producerJson, global);
      setBpList(bpList);
    }
  }, [global, producers, producerJson]);
  return { bpList };
};
