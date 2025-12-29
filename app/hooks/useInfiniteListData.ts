"use client";

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import apiClient from "../repository/api-client";
import { ListResponse } from "../types/dto";

type GetParamsFn = (page: number) => { url: string; config?: AxiosRequestConfig };

const useInfiniteListData = <T>(
  getParams: GetParamsFn,
  deps: any[] = []
) => {
  return useInfiniteQuery<ListResponse<T>>({
    queryKey: [getParams.toString(), ...deps],
    queryFn: async ({ pageParam = 1 }: QueryFunctionContext) => {
      const { url, config } = getParams(Number(pageParam));
      const res = await apiClient.get<ListResponse<T>>(url, config);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export default useInfiniteListData;
