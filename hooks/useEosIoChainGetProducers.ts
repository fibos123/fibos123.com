import { useEosIoChainGetTableRows } from ".";
import { IEosIoChainGetProducers } from "../types";

export const useEosIoChainGetProducers = (refresh = false) => {
  const body = {
    scope: "eosio",
    code: "eosio",
    table: "producers",
    json: true,
    limit: 100,
    key_type: "float64",
    index_position: 2,
  };

  let { data, isLoading, isError } = useEosIoChainGetTableRows<IEosIoChainGetProducers>(body, refresh);

  const producers: IEosIoChainGetProducers[] | undefined = data?.rows;

  return {
    producers,
    isLoading,
    isError,
  };
};
