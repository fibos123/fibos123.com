import _ from "lodash";
import useSWR from "swr";
import config from "../config";
import { ISite } from "../types";
import { post } from "../utils/api";

export const useSites = () => {
  const body = {
    json: "true",
    code: "fibos123comc",
    scope: "fibos123comc",
    table: "jsons",
    limit: 1,
    lower_bound: "sites",
  };

  let { data, error } = useSWR<ISite[]>(config.rpc_get_table_rows, post(body));

  if (data && !error) {
    const string = _.get(data, "rows[0].text", "[]");
    data = JSON.parse(string);
  }

  return {
    sites: data,
    isLoading: error && !data,
    isError: error,
  };
};
