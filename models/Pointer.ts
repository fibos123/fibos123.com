import axios from "axios";
import _ from "lodash";
import { IPointerList } from "../types/IPointerList";
import Chain from "./Chain";

class Pointer {
  point = "/v1/chain/get_info";
  list: IPointerList[] = [];
  getProducerJson = async () => {
    this.list = [];
    const producerJson = await Chain.getProducerJson();
    producerJson.map((item) => {
      const bp: IPointerList = {
        owner: item.owner,
        api_endpoint: "",
        ssl_endpoint: "",
        p2p_endpoint: "",
        number: 0,
        version: "",
        status: "waiting",
      };
      try {
        item.json = JSON.parse(item.json);
      } catch (err) {
        console.info(err);
      }

      const full = _.get(item.json, "nodes", []).find((item2: { ssl_endpoint: any }) => item2.ssl_endpoint);
      if (full && full.ssl_endpoint.substring(0, 8) === "https://") {
        bp.api_endpoint = full.api_endpoint ? full.api_endpoint : "";
        bp.ssl_endpoint = full.ssl_endpoint;
      } else {
        bp.status = "notset";
      }

      const seed = _.get(item.json, "nodes", []).find((item2: { p2p_endpoint: any }) => item2.p2p_endpoint);
      if (seed) {
        bp.p2p_endpoint = seed.p2p_endpoint;
      }

      this.list.push(bp);
    });
    this.checkStatus();
  };

  checkStatus = async () => {
    this.list
      .filter((item) => item.status === "waiting")
      .map(async (item) => {
        try {
          const response = await axios.get(item.ssl_endpoint + this.point, { timeout: 2000 });
          item.number = _.get(response, "data.head_block_num", 0);
          item.version = _.get(response, "data.server_version_string", "");
          if (item.number) {
            item.status = "success";
          } else {
            item.status = "fail";
          }
          this.list = _.orderBy(this.list, ["number", "version", "status", "owner"], ["desc", "desc", "asc", "asc"]);
        } catch (err) {
          console.info(err);
          item.status = "fail";
          this.list = _.orderBy(this.list, ["number", "version", "status", "owner"], ["desc", "desc", "asc", "asc"]);
        }
      });
  };
}

export default Pointer;
