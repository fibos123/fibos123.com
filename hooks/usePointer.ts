import { useEffect, useState } from "react";
import Pointer from "../models/Pointer";
import { IPointerList } from "../types";
import { useEosIoChainGetProducerJson } from "./useEosIoChainGetProducerJson";

interface IAccessPoints {
  "p2p-peer-address": string[];
  "http-api-address": string[];
  "https-api-address": string[];
}

export const usePointer = () => {
  const [accessPoints, setAccessPoints] = useState<IAccessPoints>();
  const [pointers, setPointers] = useState<IPointerList[]>([]);
  const { producerJson } = useEosIoChainGetProducerJson();

  useEffect(() => {
    const pointer = new Pointer();
    pointer.run(producerJson);

    async function fetchData() {
      const data = pointer.list;
      setPointers(data);
      let accessPoints: IAccessPoints = {
        "p2p-peer-address": [],
        "http-api-address": [],
        "https-api-address": [],
      };
      const successList = data.filter((item) => item.status === "success");
      const p2pList = successList.filter((item) => item.p2p_endpoint).map((item) => item.p2p_endpoint);
      const apiList = successList.filter((item) => item.api_endpoint).map((item) => item.api_endpoint);
      const sslList = successList.filter((item) => item.ssl_endpoint).map((item) => item.ssl_endpoint);
      accessPoints["p2p-peer-address"] = [...new Set([...p2pList])];
      accessPoints["http-api-address"] = [...new Set([...apiList])];
      accessPoints["https-api-address"] = [...new Set([...sslList])];

      setAccessPoints(accessPoints);
    }
    fetchData();
    let timer = setInterval(fetchData, 100);
    return () => clearInterval(timer);
  }, [producerJson]);

  return {
    accessPoints,
    pointerList: pointers,
  };
};
