import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import utils from "../../utils";
import { useBpListPage } from "../../hooks";

const Page: NextPage = () => {
  const { info, bpList } = useBpListPage();

  return (
    <Layout title="节点列表 | FIBOS 导航">
      <div>
        <div className="px-6">
          <div className="text-2xl pb-4">节点列表</div>

          <div className="flex flex-wrap gap-4 text-center">
            {info &&
              info.map((item) => (
                <div key={item.name} className="flex-1 rounded bg-white p-4">
                  <h2 className="text-slate-500">{item.name}</h2>
                  <div className="text-lg h-6 whitespace-no-wrap">{item.value}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="px-6 bg-white mt-6">
          <div className="overflow-x-auto">
            <table className="w-full my-2">
              <thead>
                <tr>
                  <th className="text-center w-6">#</th>
                  <th className="text-center w-32">节点标识</th>
                  <th>节点名称</th>
                  <th>状态</th>
                  <th>得票率</th>
                  <th>每日收益</th>
                  <th>未领取收益</th>
                  <th>网址</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {bpList.map((item, index) => (
                  <tr key={index}>
                    <td className="text-slate-400 text-center">{index + 1}</td>
                    <td className="px-2 py-2 text-center">{item.logo && <span className="h-12 w-12 block bg-cover mx-auto" style={{ backgroundImage: "url(" + item.logo + ")" }}></span>}</td>
                    <td>
                      <div>{item.candidate_name}</div>
                      <div className="text-slate-400">{item.owner}</div>
                    </td>
                    <td>
                      {
                        {
                          active: <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">当选节点</span>,
                          waiting: <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-slate-100 text-slate-800">待机节点</span>,
                        }[index + 1 <= 21 ? "active" : "waiting"]
                      }
                    </td>
                    <td>
                      <div>{utils.formatPercent(item.weight_percent)} %</div>
                      <div className="text-slate-400 text-sm">{utils.formatNumber(item.staked)} FO</div>
                    </td>
                    <td className="text-slate-400">{utils.formatNumber(item.claim_rewards_total)} FO</td>
                    <td className={"" + (item.claim_rewards_unreceived ? "text-green-500 font-bold" : "text-slate-400")}>{utils.formatNumber(item.claim_rewards_unreceived)} FO</td>
                    <td className="text-slate-400">
                      <a href={item.urlFull} target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out">
                        {item.urlSimple}
                      </a>
                    </td>
                    <td>
                      <Link href={"/bp/detail?account=" + item.owner}>
                        <a href={"/bp/detail?account=" + item.owner} className="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out">
                          详情
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Page;
