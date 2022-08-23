import React from 'react'
import Link from 'next/link'

const Footer = () => (
  <div className="bg-white px-6 h-32 flex justify-between absolute bottom-0 w-full items-center">
    <div>
      © {(new Date).getFullYear()}
      <a
        className="px-2 text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
        href="https://www.fibos123.com/"
      >FIBOS 导航</a>
    |
    <Link href="/about">
        <a href="/about" className="pl-1 text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out">BP 信息</a>
      </Link>
    </div>
    <div>
      <Link href="/">
        <a className="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
          href="/">返回首页</a>
      </Link>
    </div>
  </div>
)

export default Footer
