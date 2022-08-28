import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components";
import { useMonitor } from "../../hooks";
import { formatDate, formatNumber } from "../../utils";

const Page: NextPage = () => {
  const { monitors, producerStatus } = useMonitor();

  return (
    <Layout title="节点监控 | FIBOS 导航">
      <div>
        <div className="px-6">
          <div className="pb-4">
            <Link href="/monitor">
              <a className="cursor-default rounded bg-indigo-500 py-2 px-4 text-white transition duration-150 ease-in-out">
                出块节点在线状态
              </a>
            </Link>
            <Link href="/monitor/pointer">
              <a className="ml-4 rounded bg-white py-2 px-4 text-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white">
                接入点状态监测
              </a>
            </Link>
          </div>

          <div className="pb-4 text-2xl">出块节点在线状态</div>
          <div>
            <div className="flex flex-wrap gap-4 text-center">
              {monitors &&
                monitors.map((item) => (
                  <div key={item.name} className="flex-1 rounded bg-white p-4">
                    <h2 className="text-slate-500">{item.name}</h2>
                    <div className="whitespace-no-wrap h-6 text-lg">{item.value}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-4 bg-white px-4">
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
                        <td className="whitespace-no-wrap px-4 py-2">
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
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold text-green-800">
                                  在线
                                </span>
                              ),
                              offline: (
                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold text-red-800">离线</span>
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
