import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const logo =
  '<svg height="512" viewBox="0 0 511.819 511.819" width="512" xmlns="http://www.w3.org/2000/svg" > <g> <path d="m464.387 96.44v-35.023c13.577-3.365 23.673-15.648 23.673-30.25 0-17.186-13.981-31.167-31.167-31.167s-31.167 13.981-31.167 31.167c0 14.603 10.096 26.886 23.673 30.25v35.023c-13.577 3.365-23.673 15.648-23.673 30.251 0 4.757 1.075 9.265 2.989 13.302l-30.541 23.964c-4.878-3.168-10.688-5.017-16.926-5.017-5.059 0-9.836 1.219-14.065 3.368l-71.063-40.189c.231-1.528.353-3.092.353-4.684 0-17.186-13.981-31.167-31.167-31.167s-31.167 13.981-31.167 31.167c0 1.592.121 3.156.353 4.684l-23.168 13.102c-3.603 2.037-4.871 6.61-2.834 10.212 1.378 2.438 3.917 3.807 6.53 3.807 1.25 0 2.517-.313 3.683-.972l21.616-12.224c5.688 7.618 14.771 12.559 24.988 12.559s19.3-4.941 24.988-12.559l65.035 36.78c-3.312 4.95-5.247 10.895-5.247 17.284 0 14.603 10.096 26.886 23.673 30.25v63.817c-13.577 3.365-23.673 15.648-23.673 30.25 0 5.776 1.585 11.187 4.335 15.83l-64.123 36.264c-5.688-7.618-14.771-12.559-24.988-12.559s-19.3 4.941-24.988 12.559l-63.309-35.803c2.92-4.744 4.609-10.323 4.609-16.291 0-14.603-10.096-26.886-23.673-30.25v-63.817c13.577-3.365 23.673-15.648 23.673-30.25 0-6.582-2.056-12.69-5.553-17.727l12.502-7.071c3.603-2.038 4.871-6.61 2.834-10.212-2.038-3.604-6.608-4.872-10.213-2.834l-17.243 9.752c-4.085-1.97-8.663-3.075-13.494-3.075-17.186 0-31.167 13.981-31.167 31.167 0 14.603 10.096 26.886 23.673 30.25v63.817c-11.175 2.769-19.987 11.581-22.756 22.756h-35.026c-3.365-13.577-15.648-23.673-30.25-23.673-17.186 0-31.167 13.981-31.167 31.167s13.981 31.167 31.167 31.167c14.602 0 26.886-10.096 30.25-23.673h35.024c3.365 13.577 15.648 23.673 30.25 23.673 5.556 0 10.773-1.468 15.295-4.027l68.745 38.878c-.231 1.528-.353 3.092-.353 4.684 0 14.602 10.096 26.886 23.673 30.25v35.023c-13.577 3.365-23.673 15.648-23.673 30.251 0 17.186 13.981 31.167 31.167 31.167s31.167-13.981 31.167-31.167c0-14.603-10.096-26.886-23.673-30.251v-35.023c13.577-3.365 23.673-15.648 23.673-30.25 0-1.592-.121-3.156-.353-4.684l69.294-39.188c4.644 2.751 10.056 4.337 15.834 4.337 4.94 0 9.613-1.16 13.767-3.215l25.082 25.082c-5.943 9.86-5.944 22.322 0 32.182l-25.721 25.721c-12.073-7.835-28.421-6.469-38.999 4.109-12.152 12.152-12.152 31.924 0 44.077 6.076 6.076 14.057 9.114 22.039 9.114s15.963-3.038 22.039-9.114c10.07-10.071 11.786-25.371 5.167-37.234l26.066-26.066c4.809 2.912 10.334 4.469 16.1 4.469 8.324 0 16.151-3.242 22.038-9.129 2.392-2.392 4.365-5.13 5.864-8.137 1.846-3.704.34-8.204-3.365-10.05-3.709-1.848-8.205-.34-10.051 3.365-.775 1.556-1.8 2.977-3.047 4.224-3.055 3.056-7.118 4.739-11.439 4.739-4.322 0-8.385-1.683-11.44-4.739-6.307-6.306-6.308-16.567-.005-22.876.002-.002.004-.003.005-.005s.003-.004.005-.005c5.29-5.282 13.437-6.27 19.815-2.4 3.537 2.147 8.147 1.019 10.295-2.52 2.147-3.538 1.019-8.147-2.52-10.294-10.104-6.13-22.496-5.931-32.246-.029l-24.197-24.197c3.717-5.132 5.917-11.431 5.917-18.238 0-14.603-10.096-26.886-23.673-30.25v-63.817c13.577-3.365 23.673-15.648 23.673-30.25 0-5.505-1.44-10.677-3.955-15.17l29.733-23.33c5.213 3.922 11.689 6.25 18.7 6.25 17.186 0 31.167-13.981 31.167-31.167 0-14.603-10.096-26.887-23.673-30.252zm-199.083 37.175c-8.921 0-16.179-7.258-16.179-16.179s7.258-16.179 16.179-16.179 16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179zm-131.033 56.493c0-8.921 7.258-16.179 16.179-16.179s16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179-16.179-7.258-16.179-16.179zm-79.345 140.496c-8.921 0-16.179-7.258-16.179-16.179s7.258-16.179 16.179-16.179 16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179zm79.345-16.178c0-8.921 7.258-16.179 16.179-16.179s16.179 7.258 16.179 16.179c0 8.765-7.409 16.179-16.179 16.179-8.921-.001-16.179-7.259-16.179-16.179zm147.212 166.226c0 8.921-7.258 16.179-16.179 16.179s-16.179-7.258-16.179-16.179 7.258-16.179 16.179-16.179 16.179 7.257 16.179 16.179zm-16.179-79.346c-8.921 0-16.179-7.258-16.179-16.179s7.258-16.179 16.179-16.179 16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179zm123.551 61.645c-6.306 6.307-16.57 6.31-22.88 0-6.309-6.309-6.309-16.573 0-22.881 3.154-3.154 7.297-4.731 11.439-4.731 4.143 0 8.286 1.577 11.44 4.731 6.31 6.309 6.31 16.573.001 22.881zm51.859-431.784c0-8.921 7.258-16.179 16.179-16.179s16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179-16.179-7.258-16.179-16.179zm-43.288 283.259c0 8.694-7.456 16.179-16.179 16.179-8.921 0-16.178-7.258-16.178-16.179s7.258-16.179 16.179-16.179c8.92 0 16.178 7.258 16.178 16.179zm-16.179-108.139c-8.921 0-16.179-7.258-16.179-16.179s7.258-16.179 16.179-16.179 16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179zm75.646-63.417c-8.921 0-16.179-7.258-16.179-16.179s7.258-16.179 16.179-16.179 16.179 7.258 16.179 16.179-7.258 16.179-16.179 16.179z" /> </g> </svg>';
const menu = [
  {
    name: "网站",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.1 32C223.1 14.33 238.3 0 255.1 0C273.7 0 288 14.33 288 32H441.4C445.6 32 449.7 33.69 452.7 36.69L500.7 84.69C506.9 90.93 506.9 101.1 500.7 107.3L452.7 155.3C449.7 158.3 445.6 160 441.4 160H63.1C46.33 160 31.1 145.7 31.1 128V64C31.1 46.33 46.33 32 63.1 32L223.1 32zM480 320C480 337.7 465.7 352 448 352H70.63C66.38 352 62.31 350.3 59.31 347.3L11.31 299.3C5.065 293.1 5.065 282.9 11.31 276.7L59.31 228.7C62.31 225.7 66.38 223.1 70.63 223.1H223.1V191.1H288V223.1H448C465.7 223.1 480 238.3 480 255.1V320zM255.1 512C238.3 512 223.1 497.7 223.1 480V384H288V480C288 497.7 273.7 512 255.1 512z"/></svg>',
    path: "/",
  },
  {
    name: "节点列表",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 288H32c-17.62 0-32 14.38-32 32v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32v-128C512 302.4 497.6 288 480 288zM352 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S365.3 408 352 408zM416 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S429.3 408 416 408zM480 32H32C14.38 32 0 46.38 0 64v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32V64C512 46.38 497.6 32 480 32zM352 152c-13.25 0-24-10.75-24-24S338.8 104 352 104S376 114.8 376 128S365.3 152 352 152zM416 152c-13.25 0-24-10.75-24-24S402.8 104 416 104S440 114.8 440 128S429.3 152 416 152z"/></svg>',
    path: "/producer",
  },
  {
    name: "节点监控",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M528 0h-480C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h192L224 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h272c13.25 0 24-10.75 24-24s-10.75-24-24-24H352L336 416h192c26.5 0 48-21.5 48-48v-320C576 21.5 554.5 0 528 0zM512 288H64V64h448V288z"/></svg>',
    path: "/monitor",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const getFirstPath = () => {
    let path = "";
    const indexOf = router.route.indexOf("/", 1);
    path = router.route.substring(0, indexOf > 0 ? indexOf : 100);
    return path;
  };
  const firstPath = getFirstPath();

  return (
    <header className="relative">
      <div className="py-6 px-8 sm:px-6">
        <nav className="flex items-center justify-start sm:h-10">
          <div className="flex flex-shrink-0 flex-grow items-center sm:flex-grow-0">
            <div className="flex w-full items-center justify-between sm:w-auto">
              <Link href="/" aria-label="Home">
                <i
                  className="logo block h-10 w-10 text-indigo-600 sm:h-10"
                  dangerouslySetInnerHTML={{ __html: logo }}
                ></i>
              </Link>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 transition duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-400 focus:bg-slate-100 focus:text-slate-400 focus:outline-none"
                  id="main-menu"
                  aria-label="Main menu"
                  aria-haspopup="true"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden pl-4 sm:block">
            {menu.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className={
                  "p-4 font-medium transition duration-150 ease-in-out hover:text-indigo-600 " +
                  (firstPath === item.path ? "text-indigo-600" : "text-slate-400")
                }
              >
                <i
                  className={"mr-2 inline-block h-5 w-5 align-middle"}
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                ></i>
                <span className="align-middle">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <nav
        className={
          "absolute inset-x-0 top-0 origin-top-right transform p-2 transition sm:hidden " +
          (isOpen ? "block" : "hidden")
        }
      >
        <div className="rounded-lg shadow-md">
          <div
            className="shadow-xs overflow-hidden rounded-lg bg-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="main-menu"
          >
            <div className="flex items-center justify-between px-5 pt-4">
              <i className="logo block h-8 w-8 text-indigo-600" dangerouslySetInnerHTML={{ __html: logo }}></i>
              <div className="-mr-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 transition duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-400 focus:bg-slate-100 focus:text-slate-400 focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3">
              {menu.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  className={
                    "block rounded-md px-3 py-2 text-base font-medium text-slate-700 transition duration-150 ease-in-out hover:bg-slate-50 hover:text-indigo-600 focus:bg-slate-50 focus:text-indigo-600 focus:outline-none " +
                    (firstPath === item.path ? "text-indigo-600" : "")
                  }
                >
                  <i className={"pr-1 " + item.icon}></i>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
