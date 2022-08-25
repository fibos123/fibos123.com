import { useEosIoChainGetTableRows } from ".";
import { ISite, ISiteRaw } from "../types";

export const useSites = () => {
  const body = {
    json: "true",
    code: "fibos123comc",
    scope: "fibos123comc",
    table: "jsons",
    limit: 1,
    lower_bound: "sites",
  };

  const { data, isLoading, isError } = useEosIoChainGetTableRows<ISiteRaw>(body);

  let sites: ISite[] = [];

  if (data && !isError) {
    const string = data.rows[0]?.text || "[]";
    sites = JSON.parse(string);
  }

  return {
    sites,
    isLoading,
    isError,
  };
};
