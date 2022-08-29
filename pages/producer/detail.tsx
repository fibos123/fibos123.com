import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout } from "../../components";
import { useProducerDetail } from "../../hooks";

const Page: NextPage = () => {
  const router = useRouter();
  const { account } = router.query as { account: string };
  const { detail } = useProducerDetail(account);

  return (
    <Layout title="节点信息 | FIBOS 导航">
      <div className="px-6">
        <div className="rounded bg-white p-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl">{account} 节点详情</h1>
          </div>

          <div className="overflow-x-auto">
            {detail &&
              detail.map((item) => (
                <div key={item.title}>
                  <h2 className="py-4 text-xl">{item.title}</h2>
                  <table>
                    <tbody>
                      {item.list.map((item) => (
                        <tr key={item.key}>
                          <th>{item.key}</th>
                          <td className="whitespace-pre-wrap">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        </div>

        <div className="py-6">
          <Link href="/producer">
            <a className="text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800">返回列表</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Page;