import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useBpDetail } from "../../hooks";

const Page: NextPage = () => {
  const router = useRouter();
  const { account } = router.query as { account: string };
  const { detail } = useBpDetail(account);

  return (
    <Layout title="节点信息 | FIBOS 导航">
      <div className="px-6">
        <div className="bg-white p-6 rounded">
          <div className="border-b pb-4">
            <h1 className="text-2xl">{account} 节点详情</h1>
          </div>

          <div className="overflow-x-auto">
            {detail &&
              detail.map((item) => (
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
};
export default Page;
