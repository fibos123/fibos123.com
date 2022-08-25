import { IEosIoChainGetProducerJson, IPointerList } from "../types";
import { get } from "../utils";

class Pointer {
  point = "/v1/chain/get_info";
  list: IPointerList[] = [];
  getProducerJson = async (producerJson: IEosIoChainGetProducerJson[]) => {
    this.list = [];
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
      let json = [];
      try {
        json = JSON.parse(item.json);
      } catch (err) {
        console.info(err);
      }
      const nodes = json?.nodes || [];
      const full = nodes.find((item2: { ssl_endpoint: any }) => item2.ssl_endpoint);
      if (full && full.ssl_endpoint.substring(0, 8) === "https://") {
        bp.api_endpoint = full.api_endpoint ? full.api_endpoint : "";
        bp.ssl_endpoint = full.ssl_endpoint;
      } else {
        bp.status = "notset";
      }

      const seed = nodes.find((item2: { p2p_endpoint: any }) => item2.p2p_endpoint);
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
          const response = await get(item.ssl_endpoint + this.point);
          item.number = response?.head_block_num || 0;
          item.version = response?.server_version_string || "";
          if (item.number) {
            item.status = "success";
          } else {
            item.status = "fail";
          }
          this.list = this.list.sort((x, y) => x.owner.localeCompare(y.owner));
          this.list = this.list.sort((x, y) => x.status.localeCompare(y.status));
          this.list = this.list.sort((x, y) => x.version.localeCompare(y.version));
          this.list = this.list.sort((x, y) => y.number - x.number);
        } catch (err) {
          item.status = "fail";
          this.list = this.list.sort((x, y) => x.owner.localeCompare(y.owner));
          this.list = this.list.sort((x, y) => x.status.localeCompare(y.status));
          this.list = this.list.sort((x, y) => x.version.localeCompare(y.version));
          this.list = this.list.sort((x, y) => y.number - x.number);
        }
      });
  };
}

export default Pointer;
