import { useEffect, useState } from "react";

interface IGetInfo {
  url: string;
  method?: "GET" | "POST";
  body?: any;
}

interface IGetInit {
  refresh: boolean;
}

const cache = new Map<string, any>();
const refreshInterval = 1000;

/**
 * useGet ( like useSWR )
 *
 * @param IGetInfo
 * @param IGetInit
 * @returns
 */
export const useGet = <T, E>(
  { url, method = "GET", body }: IGetInfo,
  { refresh = false }: IGetInit = { refresh: false }
) => {
  const bodyStringify = body ? JSON.stringify(body) : null;
  const cacheKey = [method, url, bodyStringify].join();
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<E>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const hasCache = cache.has(cacheKey);

      if (hasCache) {
        const cacheData = cache.get(cacheKey);
        setData(cacheData);
      }

      try {
        const response = await fetch(url, { method, body: bodyStringify });
        const data: T = await response.json();
        setData(data);
        cache.set(cacheKey, data);
      } catch (error) {
        setIsError(true);
        setError(error as E);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    if (refresh) {
      const timer = setInterval(fetchData, refreshInterval);
      return () => clearInterval(timer);
    }
  }, []);

  return { data, isLoading, isError, error };
};
