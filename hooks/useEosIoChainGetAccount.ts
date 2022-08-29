import { useGet } from "./useGet";
import { api } from "../config";
import { IEosIoChainGetAccount } from "../types";

export const useEosIoChainGetAccount = (account_name: string) => {
  const body = { account_name };
  const { data, isLoading, isError } = useGet<IEosIoChainGetAccount, any>({
    url: api.rpcGetAccount,
    method: "POST",
    body,
  });
  const account = data;

  return { account, isLoading, isError };
};
