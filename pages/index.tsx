import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useSites } from "../hooks";

const Home: NextPage = () => {
  const { sites } = useSites();

  return (
    <Layout title="FIBOS 导航">
      <style jsx>{`
        @media (max-width: 640px) {
          li:nth-child(even) {
            border-right: 0;
          }
          li:nth-child(odd):last-child {
            width: 100%;
            border-right: 0;
          }
        }
        .bg {
          background-image: url("/bg.jpg");
        }
      `}</style>
      <div>
        <div className="text-white py-20 text-center bg-cover bg-center bg-black bg">
          <div className="text-4xl pb-1">FIBOS 导航</div>
          <div>一个收录 FIBOS 网址及资源的小导航</div>
        </div>
        <div className="p-2 sm:p-6 text-center sm:text-left">
          {sites &&
            sites.map((item) => (
              <section key={item.name} className="bg-white p-4 rounded mb-4">
                <div className="border-b text-lg pb-4 sm:pl-2">
                  {item.icon && <i className={"inline-block w-5 h-5 mr-2 align-middle"} dangerouslySetInnerHTML={{ __html: item.icon }}></i>}
                  <span className="align-middle">{item.name}</span>
                </div>
                {item.sub.map((item) => (
                  <div key={item.name} className="sm:flex relative">
                    {item.name && (
                      <header className="text-center border-dotted text-lg flex-grow-0 flex-shrink-0 justify-center items-center sm:flex sm:border-r sm:w-32 sm:mr-4 border-b sm:border-b-0 py-4">
                        <h2>{item.name}</h2>
                      </header>
                    )}
                    <ul className="flex flex-wrap sm:gap-x-4 pt-4">
                      {item.child.map((item) => (
                        <li key={item.name} className="w-1/2 relative border-dotted border-r sm:pr-4 sm:w-64 border-b sm:border-b-0">
                          <a href={item.url} target="_blank" rel="noreferrer" className="hover:bg-indigo-50 block pt-3 px-1 sm:px-4 rounded transition duration-150 ease-in-out h-32 sm:h-24">
                            <p className="pb-1 text-blue-500 fill-blue-500">
                              {item.icon && (
                                <i
                                  className={"inline-block w-4 mr-2 align-middle"}
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
                            <p className="absolute top-0 right-0 mt-2 sm:mr-6 mr-2">
                              <a href={item.more.url} target="_blank" rel="noreferrer" className="text-xs rounded bg-blue-600 py-1 px-2 text-white block">
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
      </div>
    </Layout>
  );
};

export default Home;
