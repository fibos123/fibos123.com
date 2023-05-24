import React, { ReactNode } from "react";
import Head from "next/head";
import { Header, Footer } from "./";
import { useMonitor, useHeadBlockInfo, useProducers, useSites } from "../hooks";
import Script from 'next/script'

type Props = {
  children?: ReactNode;
  title?: string;
  id?: string;
};

export const Layout = ({ children, title = "This is the default title", id }: Props) => {
  // preload data
  useSites();
  useHeadBlockInfo(false);
  useProducers();
  useMonitor(false);

  return (
    <div id={id} className="relative mx-auto min-h-screen bg-slate-100 pb-32 text-slate-800 ">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Header />
      {children}
      <Footer />
      <Script id="google-analytics-script1" async src="https://www.googletagmanager.com/gtag/js?id=G-VH918P1NJQ"></Script>
      <Script
        id="google-analytics-script2"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VH918P1NJQ');
        `,
        }}
      />
    </div>
  );
};
