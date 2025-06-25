"use client"; // Required for hooks like useSearchParams, useProducerDetail

import { useSearchParams } from "next/navigation"; // Changed from next/router
import Link from "next/link";
import { useProducerDetail } from "../../../hooks"; // Adjust path as needed
// import { Layout } from "../../../components"; // Layout is handled by app/layout.tsx

// It's good practice to define metadata, though it might be dynamic based on 'account'
// For dynamic titles, you might need a different approach or generateMetadata function
// export const metadata = {
//   title: "节点信息 | FIBOS 导航",
// };

export default function ProducerDetailPage() {
  const searchParams = useSearchParams();
  const account = searchParams.get("account") as string;
  const { detail } = useProducerDetail(account);

  // Dynamic title based on account
  // This approach for dynamic titles inside the component is more for client components.
  // For server components, generateMetadata is preferred.
  if (typeof window !== "undefined") {
    document.title = `${account} 节点信息 | FIBOS 导航`;
  }


  return (
    // <Layout title="节点信息 | FIBOS 导航"> // Layout is handled by app/layout.tsx
    <main className="px-6">
      <div className="rounded bg-white p-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl">{account || "Loading..."} 节点详情</h1>
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
          {!detail && !account && <div>Loading account details...</div>}
          {account && !detail && <div>Loading details for {account}...</div>}
        </div>
      </div>

      <div className="py-6">
        <Link href="/producer" className="text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800">
          返回列表
        </Link>
      </div>
    </main>
    // </Layout>
  );
}
