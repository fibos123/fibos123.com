import { EndPointStatus } from "../enums";
import { IEosIoChainGetProducerJson, IPoints } from "../types";
import { get } from "../utils";

// class Status {
//   owner: string;
//   api_endpoint: string;
//   ssl_endpoint: string;
//   p2p_endpoint: string;
//   number: number;
//   version: string;
//   status: string;
// }

class Pointer {
  private point = "/v1/chain/get_info";
  public points: IPoints[] = [];

  async run(producerJson: IEosIoChainGetProducerJson[]) {
    this.points = [];
    this.points = producerJson.map((item) => {
      const bp: IPoints = {
        owner: item.owner,
        api_endpoint: "",
        ssl_endpoint: "",
        p2p_endpoint: "",
        number: 0,
        version: "",
        status: EndPointStatus.waiting,
      };
      let json = [];
      try {
        json = JSON.parse(item.json);
      } catch (error) {}
      const nodes = json.nodes || [];
      const full = nodes.find((item2: { ssl_endpoint: any }) => item2.ssl_endpoint);
      const seed = nodes.find((item2: { p2p_endpoint: any }) => item2.p2p_endpoint);

      if (full && full.ssl_endpoint.substring(0, 8) === "https://") {
        bp.api_endpoint = full.api_endpoint ? full.api_endpoint : "";
        bp.ssl_endpoint = full.ssl_endpoint;
      } else {
        bp.status = EndPointStatus.notSet;
      }

      if (seed) {
        bp.p2p_endpoint = seed.p2p_endpoint;
      }

      return bp;
    });

    this.points
      .filter((item) => item.status === EndPointStatus.waiting)
      .forEach(async (item) => {
        try {
          const response = await get(item.ssl_endpoint + this.point);
          item.number = response?.head_block_num || 0;
          item.version = response?.server_version_string || "";
          if (item.number) {
            item.status = EndPointStatus.success;
          } else {
            item.status = EndPointStatus.fail;
          }
        } catch (error) {
          item.status = EndPointStatus.fail;
        }
        this.points = this.points.sort((x, y) => x.owner.localeCompare(y.owner));
        this.points = this.points.sort((x, y) => y.status - x.status);
        this.points = this.points.sort((x, y) => x.version.localeCompare(y.version));
        this.points = this.points.sort((x, y) => y.number - x.number);
      });
  }
}

export default Pointer;
