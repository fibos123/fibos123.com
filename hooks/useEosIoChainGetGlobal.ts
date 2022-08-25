import { useEosIoChainGetTableRows } from ".";
import { IEosIoChainGetGlobal } from "../types";

export const useEosIoChainGetGlobal = (refresh = false) => {
  const body = {
    code: "eosio",
    json: true,
    limit: 1,
    scope: "eosio",
    table: "global",
  };

  let { data, isLoading, isError } = useEosIoChainGetTableRows<IEosIoChainGetGlobal>(body, refresh);

  const global: IEosIoChainGetGlobal | undefined = data?.rows[0];

  return {
    global,
    isLoading,
    isError,
  };
};
