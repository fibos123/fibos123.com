import React from "react";
import Link from "next/link";

export const Footer = () => (
  <footer className="absolute bottom-0 flex h-32 w-full items-center justify-between bg-white px-6">
    <div>
      © {new Date().getFullYear()}
      <a
        className="px-2 text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800"
        href="https://www.fibos123.com/"
      >
        FIBOS 导航
      </a>
      |
      <Link href="/about" className="pl-1 text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800">
        BP 信息
      </Link>
    </div>
    <div>
      <Link href="/" className="text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800">
        返回首页
      </Link>
    </div>
  </footer>
);
