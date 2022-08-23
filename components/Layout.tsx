import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
  title?: string;
  mode?: string;
};

const Layout = ({ children, title = "This is the default title", mode }: Props) => (
  <div className={"bg-slate-100 text-slate-800 mx-auto min-h-screen relative pb-32 " + (mode === "dark" ? "dark" : "")}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>

    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
