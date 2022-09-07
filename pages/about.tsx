import type { NextPage } from "next";
import { Layout } from "../components";

const Page: NextPage = () => {
  return (
    <Layout title="BP 信息 | FIBOS 导航" id="about-page">
      <main className="flex h-full items-center justify-center p-6">
        <div>
          <h2 className="text-5xl">FIBOS 导航竞选 FIBOS 超级节点</h2>
          <h5 className="pt-4 text-xl">简介</h5>
          <p>FIBOS 导航是由在日本中国人 Andy 发起。</p>
          <p>旨在维护稳定的 FIBOS 节点，向公众传播有关 FIBOS 知识，为社区做出贡献。</p>

          <h5 className="pt-6 text-xl">成员</h5>
          <p>
            <b>Andy 创始人</b>
            <br />
            <span>全栈开发者，现居日本东京。</span>
          </p>

          <h5 className="pt-6 text-xl">节点信息</h5>
          <p>
            <b>节点账户</b>
            <br />
            <span>fibos123comm</span>
          </p>

          <h5 className="pt-6 text-xl">联系</h5>
          <p>
            <b className="pr-2">Email</b>
            <span>bp@fibos123.com</span>
          </p>

          <h5 className="pt-6 text-xl">物料下载</h5>
          <p>
            <b className="pr-2">品牌标识</b>
            <span className="pr-2">
              <a href="/logo.svg" target="_blank" className="underline">
                SVG
              </a>
            </span>
            <span className="pr-2">
              <a href="/public/images/logo_256.png" target="_blank" className="underline">
                PNG
              </a>
            </span>
          </p>

          <h5 className="pt-6 text-xl">鸣谢</h5>
          <div>Icons made by Freepik from www.flaticon.com</div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;
