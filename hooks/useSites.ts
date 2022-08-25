import { useEosIoChainGetTableRows } from ".";
import { ISite, ISiteWrapRow } from "../types";

export const useSites = (refresh = false) => {
  const body = {
    json: "true",
    code: "fibos123comc",
    scope: "fibos123comc",
    table: "jsons",
    limit: 1,
    lower_bound: "sites",
  };

  const { data, isLoading, isError } = useEosIoChainGetTableRows<ISiteWrapRow>(body, refresh);

  let sites: ISite[] = [];

  if (data && !isError) {
    const string = data?.rows[0]?.text || "[]";
    sites = JSON.parse(string) as ISite[];
  }

  return {
    sites,
    isLoading,
    isError,
  };
};
