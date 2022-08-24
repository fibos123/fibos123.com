import _ from "lodash";
import { useEffect, useState } from "react";
import useSWR from "swr";
import config from "../config";
import { IPointerList } from "../interfaces/IPointerList";
import { IProducerJsonRow } from "../interfaces/IProducerJson";
import Pointer from "../models/Pointer";
import { get, post } from "../utils/api";

interface IAccessPoints {
  "p2p-peer-address": string[];
  "http-api-address": string[];
  "https-api-address": string[];
}

export const usePointer = () => {
  const producerJsonBody = {
    json: true,
    code: "producerjson",
    scope: "producerjson",
    table: "producerjson",
    limit: 1000,
  };

  const { data, error } = useSWR<IProducerJsonRow>(config.rpc_get_table_rows, post(producerJsonBody));

  const [accessPoints, setAccessPoints] = useState<IAccessPoints>();
  const [pointerList, setPointerList] = useState<IPointerList[]>([]);

  useEffect(() => {
    const pointer = new Pointer();
    pointer.getProducerJson();

    async function fetchData() {
      const data = pointer.list;
      setPointerList(data);
      let accessPoints: IAccessPoints = {
        "p2p-peer-address": [],
        "http-api-address": [],
        "https-api-address": [],
      };
      const successList = data.filter((item) => item.status === "success");
      accessPoints["p2p-peer-address"] = _.union(successList.filter((item) => item.p2p_endpoint).map((item) => item.p2p_endpoint));

      accessPoints["http-api-address"] = _.union(successList.filter((item) => item.api_endpoint).map((item) => item.api_endpoint));

      accessPoints["https-api-address"] = _.union(successList.filter((item) => item.ssl_endpoint).map((item) => item.ssl_endpoint));

      setAccessPoints(accessPoints);
    }
    fetchData();
    let timer = setInterval(fetchData, 100);
    return () => clearInterval(timer);
  }, []);

  return {
    accessPoints,
    pointerList,
    isLoading: error && !data,
    isError: error,
  };
};
