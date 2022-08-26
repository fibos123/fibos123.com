import React, { ReactNode } from "react";
import Head from "next/head";
import { Header, Footer } from "./";

type Props = {
  children?: ReactNode;
  title?: string;
  id?: string;
};

export const Layout = ({ children, title = "This is the default title", id }: Props) => (
  <div id={id} className="bg-slate-100 text-slate-800 mx-auto min-h-screen relative pb-32 ">
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
