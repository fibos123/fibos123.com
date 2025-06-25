"use client"; // Required for hooks and client-side interactions

import Link from "next/link";
import { useHeadBlockInfo, useProducers } from "../../hooks"; // Adjust path as needed
import { formatPercent, formatNumber } from "../../utils"; // Adjust path as needed

export const metadata = {
  title: "节点列表 | FIBOS 导航",
};

export default function ProducerPage() {
  const { info } = useHeadBlockInfo(true);
  const { bpList } = useProducers();

  return (
    // <Layout title="节点列表 | FIBOS 导航"> // Layout is handled by app/layout.tsx
    <main>
      <div className="px-6">
        <div className="pb-4 text-2xl">节点列表</div>

        <div className="flex flex-wrap gap-4 text-center">
          {info &&
            info.map((item) => (
              <div key={item.name} className="flex-1 rounded bg-white p-4">
                <h2 className="text-slate-500">{item.name}</h2>
                <div className="whitespace-no-wrap h-6 text-lg">{item.value}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-6 bg-white px-6">
        <div className="overflow-x-auto">
          <table className="my-2">
            <thead>
              <tr>
                <th className="w-6 text-center">#</th>
                <th className="w-32 text-center">节点标识</th>
                <th>节点名称</th>
                <th>状态</th>
                <th>得票率</th>
                <th>每日收益</th>
                <th>未领取收益</th>
                <th>网址</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {bpList.map((item, index) => (
                <tr key={index}>
                  <td className="text-center text-slate-400">{index + 1}</td>
                  <td className="px-2 py-2 text-center">
                    {item.logo && (
                      <span
                        className="mx-auto block h-12 w-12 bg-cover"
                        style={{ backgroundImage: "url(" + item.logo + ")" }}
                      ></span>
                    )}
                  </td>
                  <td>
                    <div>{item.candidate_name}</div>
                    <div className="text-slate-400">{item.owner}</div>
                  </td>
                  <td>
                    {
                      {
                        active: (
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold text-green-800">
                            当选节点
                          </span>
                        ),
                        waiting: (
                          <span className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-800">
                            待机节点
                          </span>
                        ),
                      }[index + 1 <= 21 ? "active" : "waiting"]
                    }
                  </td>
                  <td>
                    <div>{formatPercent(item.weight_percent)} %</div>
                    <div className="text-sm text-slate-400">{formatNumber(item.staked)} FO</div>
                  </td>
                  <td className="text-slate-400">{formatNumber(item.claimRewardsTotal)} FO</td>
                  <td className={"" + (item.claimRewardsUnreceived ? "font-bold text-green-500" : "text-slate-400")}>
                    {formatNumber(item.claimRewardsUnreceived)} FO
                  </td>
                  <td className="text-slate-400">
                    <a
                      href={item.urlFull}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800"
                    >
                      {item.urlSimple}
                    </a>
                  </td>
                  <td>
                    <Link
                      href={"/producer/detail?account=" + item.owner}
                      className="text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800"
                    >
                      详情
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
    // </Layout>
  );
}
