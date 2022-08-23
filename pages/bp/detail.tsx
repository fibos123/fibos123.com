import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import Chain from "../../models/Chain";
import { Row as GlobalRow } from "../../interfaces/Global";
import { Row as ProducerRow } from "../../interfaces/Producer";
import { Row as ProducerJsonRow } from "../../interfaces/ProducerJson";
import _ from "lodash";
import utils from "../../utils";

export default function IndexPage() {
  interface Detail {
    title: string;
    list: {
      key: string;
      value: string;
    }[];
  }

  const router = useRouter();
  const { account } = router.query;
  const [detail, setDetail] = useState<Detail[]>([]);

  useEffect(() => {
    async function fetchDetail() {
      if (!account || "string" !== typeof account) {
        console.error("not account");
        return;
      }
      const accountInfo = await Chain.getAccount(account);

      // @ts-ignore
      const [producers, producerJson, global] = await Promise.all<[ProducerRow[], ProducerJsonRow[], GlobalRow]>([
        Chain.getProducers(),
        Chain.getProducerJson(),
        Chain.getGlobal(),
      ]);

      const bpList = Chain.generateBpList(producers, producerJson, global);
      const bp = bpList.find((item) => item.owner === account);
      if (!bp) {
        console.log("not bp");
        return;
      }

      let detail: Detail[] = [
        {
          title: "基本信息",
          list: [
            {
              key: "创建时间",
              value: utils.formatDate(accountInfo.created + "Z"),
            },
            {
              key: "排名",
              value: (bpList.findIndex((item) => item.owner === account) + 1).toString(),
            },
            {
              key: "得票率",
              value: utils.formatPercent(bp.weight_percent) + " %",
            },
            {
              key: "有效票数",
              value: utils.formatNumber(bp.staked) + " FO",
            },
            {
              key: "得票权重",
              value: utils.formatNumber(parseInt(bp.producer.total_votes)),
            },
          ],
        },
        {
          title: "收益信息",
          list: [
            {
              key: "每日收益",
              value: utils.formatNumber(bp.claim_rewards_total) + " FO",
            },
            {
              key: "未领取收益",
              value: utils.formatNumber(bp.claim_rewards_unreceived) + " FO",
            },
            {
              key: "未支付块",
              value: utils.formatNumber(bp.producer.unpaid_blocks),
            },
            {
              key: "上次领取时间",
              value: utils.formatDate(bp.producer.last_claim_time / 1000),
            },
          ],
        },
      ];
      if (bp.json) {
        let list = [];
        let list2 = [];
        for (const key in bp.json.org) {
          list.push({
            key: key,
            value: "object" === typeof bp.json.org[key] ? JSON.stringify(bp.json.org[key]) : bp.json.org[key],
          });
        }
        detail.push({
          title: "JSON 信息",
          list,
        });

        const producer = bp.json.nodes.find((item) => item.node_type === "producer");
        const full = bp.json.nodes.find((item) => item.node_type === "full");
        const seed = bp.json.nodes.find((item) => item.node_type === "seed");
        if (producer) {
          list2.push({
            key: "producer",
            value: `国家或地区：
${producer.location.name}, ${producer.location.country}`,
          });
        }
        if (full) {
          list2.push({
            key: "full",
            value: `国家或地区：
${full.location.name}, ${full.location.country}
接入点地址：
${full.api_endpoint}
${full.ssl_endpoint}`,
          });
        }
        if (seed) {
          list2.push({
            key: "seed",
            value: `国家或地区：
${seed.location.name}, ${seed.location.country}
接入点地址：
${seed.p2p_endpoint}`,
          });
        }
        detail.push({
          title: "接入点信息",
          list: list2,
        });
      } else {
        detail.push({
          title: "JSON 信息",
          list: [
            {
              key: "该节点未设置 JSON",
              value: "",
            },
          ],
        });
      }
      setDetail(detail);
    }
    fetchDetail();
  }, [account]);

  return (
    <Layout title="节点信息 | FIBOS 导航">
      <div className="px-6">
        <div className="bg-white p-6 rounded">
          <div className="border-b pb-4">
            <h1 className="text-2xl">{account} 节点详情</h1>
          </div>

          <div className="overflow-x-auto">
            {detail.map((item) => (
              <div key={item.title}>
                <h2 className="text-xl py-4">{item.title}</h2>
                <table className="w-full">
                  <tbody>
                    {item.list.map((item) => (
                      <tr key={item.key}>
                        <th className="p-4 text-right w-32">{item.key}</th>
                        <td style={{ whiteSpace: "break-spaces" }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6">
          <Link href="/bp">
            <a className="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out">返回列表</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
