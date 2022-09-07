import type { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { Layout } from "../../components";
import { usePointer } from "../../hooks";
import { formatNumber } from "../../utils";
import { EndPointStatus } from "../../enums";

const linkIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"/></svg>';

const Page: NextPage = () => {
  const { accessPoints, points } = usePointer();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout title="节点监控 | FIBOS 导航">
      <main>
        <div className="px-6">
          <div className="pb-4">
            <Link href="/monitor">
              <a className="rounded bg-white py-2 px-4 text-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white">
                出块节点在线状态
              </a>
            </Link>
            <Link href="/monitor/pointer">
              <a className="ml-4 cursor-default rounded bg-indigo-500 py-2 px-4 text-white transition duration-150 ease-in-out">
                接入点状态监测
              </a>
            </Link>
          </div>

          <div className="flex justify-between">
            <div className="text-2xl">接入点状态监测</div>
            <a
              className="cursor-pointer text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              可用接入点列表
            </a>
          </div>

          <div className="mt-4 bg-white px-6">
            <div className="overflow-x-auto">
              <table className="my-2 w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>节点账户</th>
                    <th>HTTPS 状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {points &&
                    points.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-200">
                        <td className=" text-slate-500">{index + 1}</td>
                        <td>
                          <div className="flex items-center">
                            <div className="text-slate-900">{item.owner}</div>
                          </div>
                        </td>
                        <td>
                          {
                            [
                              <span
                                key={EndPointStatus.notSet}
                                className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-800"
                              >
                                未设置
                              </span>,
                              <span
                                key={EndPointStatus.waiting}
                                className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-800"
                              >
                                获取中
                              </span>,
                              <span
                                key={EndPointStatus.fail}
                                className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold text-red-800"
                              >
                                无法访问
                              </span>,
                              <span
                                key={EndPointStatus.success}
                                className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold text-green-800"
                              >
                                {formatNumber(item.number)} ( {item.version} )
                              </span>,
                            ][item.status]
                          }
                          {item.status !== EndPointStatus.notSet && (
                            <a
                              target="_blank"
                              href={item.ssl_endpoint + "/v1/chain/get_info"}
                              rel="noreferrer"
                              className="ml-4 text-indigo-500"
                              title="打开新窗口查看接入点"
                            >
                              <i className={"inline-block h-4 w-4"} dangerouslySetInnerHTML={{ __html: linkIcon }}></i>
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={"fixed inset-0 z-10 overflow-y-auto " + (isOpen ? "block" : "hidden")}>
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>&#8203;
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5">
                <h3 className="pb-2 text-lg font-medium leading-6 text-slate-900">可用接入点列表</h3>
                <div className="sm:flex sm:items-start">
                  <pre className="h-64 w-full overflow-auto text-sm">{JSON.stringify(accessPoints, null, 2)}</pre>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    className="focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-base font-medium leading-6 text-slate-700 shadow-sm transition duration-150 ease-in-out hover:text-slate-500 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    关闭
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Page;
