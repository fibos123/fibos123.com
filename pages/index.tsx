import type { NextPage } from "next";
import { Layout } from "../components";
import { useSites } from "../hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Page: NextPage = () => {
  const { sites } = useSites();
  const [parent] = useAutoAnimate((el, action, oldCoords, newCoords) => {
    let keyframes;
    keyframes = [{ opacity: 0 }, { opacity: 1 }];
    return new KeyframeEffect(el, keyframes, { duration: 100 });
  });

  return (
    <Layout title="FIBOS 导航">
      <main>
        <div className="bg-black bg-cover bg-center py-20 text-center text-white" style={{ backgroundImage: 'url("/bg.jpg")' }}>
          <div className="pb-1 text-4xl">FIBOS 导航</div>
          <div>一个收录 FIBOS 网址及资源的小导航</div>
        </div>
        <div className="p-2 text-center sm:p-6 sm:text-left" ref={parent}>
          {sites &&
            sites.map((item) => (
              <section key={item.name} className="mb-4 rounded bg-white p-4">
                <div className="border-b pb-4 text-lg sm:pl-2">
                  {item.icon && <i className={"mr-2 inline-block h-5 w-5 align-middle"} dangerouslySetInnerHTML={{ __html: item.icon }}></i>}
                  <span className="align-middle">{item.name}</span>
                </div>
                {item.sub.map((item) => (
                  <div key={item.name} className="relative sm:flex">
                    {item.name && (
                      <header className="flex-shrink-0 flex-grow-0 items-center justify-center border-b border-dotted py-4 text-center text-lg sm:mr-4 sm:flex sm:w-32 sm:border-r sm:border-b-0">
                        <h2>{item.name}</h2>
                      </header>
                    )}
                    <ul className="flex flex-wrap pt-4 sm:gap-x-4">
                      {item.child.map((item) => (
                        <li key={item.name} className="relative w-1/2 border-r border-b border-dotted odd:last:w-full odd:last:border-r-0 even:border-r-0 sm:w-64 sm:border-b-0 sm:pr-4 sm:odd:last:w-64 sm:odd:last:border-r sm:even:border-r">
                          <a href={item.url} target="_blank" rel="noreferrer" className="block h-32 rounded px-1 pt-3 transition duration-150 ease-in-out hover:scale-105 hover:bg-indigo-50  sm:h-24 sm:px-4">
                            <p className="pb-1 text-blue-500">
                              {item.icon && (
                                <i
                                  className={"mr-2 inline-block w-4 align-middle"}
                                  dangerouslySetInnerHTML={{
                                    __html: item.icon,
                                  }}
                                ></i>
                              )}
                              <span className="align-middle">{item.name}</span>
                            </p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </a>
                          {item.more && (
                            <p className="absolute top-0 right-0 mt-2 mr-2 sm:mr-6">
                              <a href={item.more.url} target="_blank" rel="noreferrer" className="block rounded bg-blue-600 py-1 px-2 text-xs text-white">
                                {item.more.name}
                              </a>
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
        </div>
      </main>
    </Layout>
  );
};

export default Page;
