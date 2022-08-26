import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components";
import { useProducerStatus } from "../../hooks";
import { formatDate, formatNumber } from "../../utils";

const Page: NextPage = () => {
  const { card, producerStatus } = useProducerStatus();

  return (
    <Layout title="节点监控 | FIBOS 导航">
      <div>
        <div className="px-6">
          <div className="pb-4">
            <Link href="/monitor">
              <a className="bg-indigo-500 transition duration-150 ease-in-out text-white py-2 px-4 rounded cursor-default">
                出块节点在线状态
              </a>
            </Link>
            <Link href="/monitor/pointer">
              <a className="ml-4 text-indigo-500 transition duration-150 ease-in-out bg-white py-2 px-4 rounded hover:bg-indigo-500 hover:text-white">
                接入点状态监测
              </a>
            </Link>
          </div>

          <div className="text-2xl pb-4">出块节点在线状态</div>
          <div>
            <div className="flex flex-wrap gap-4 text-center">
              {card &&
                card.map((item) => (
                  <div key={item.name} className="flex-1 rounded bg-white p-4">
                    <h2 className="text-slate-500">{item.name}</h2>
                    <div className="text-lg h-6 whitespace-no-wrap">{item.value}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-4 bg-white mt-4">
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>节点名称</th>
                    <th>状态</th>
                    <th>生产区块</th>
                    <th>最终生产时间</th>
                  </tr>
                </thead>
                <tbody>
                  {producerStatus &&
                    producerStatus.rows2.map((item, index) => (
                      <tr key={item.bpname} className={item.bpname === producerStatus.head_block_producer ? "font-bold" : ""}>
                        <td className={item.bpname === producerStatus.head_block_producer ? "text-slate-800" : ""}>{index + 1}</td>
                        <td className="px-4 py-2 whitespace-no-wrap">
                          <div className="flex items-center">
                            <div className="ml-2">
                              <div className="text-slate-900">{item.bpname}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {
                            {
                              online: (
                                <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  在线
                                </span>
                              ),
                              offline: (
                                <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">离线</span>
                              ),
                            }[producerStatus.head_block_num - item.number <= 242 ? "online" : "offline"]
                          }
                        </td>
                        <td className={item.bpname === producerStatus.head_block_producer ? "text-slate-800" : ""}>
                          {formatNumber(item.number)}
                        </td>
                        <td className={item.bpname === producerStatus.head_block_producer ? "text-slate-800" : ""}>
                          {formatDate(item.date)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Page;
