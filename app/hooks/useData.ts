import { useQuery } from "@tanstack/react-query";
import apiClient from "../repository/api-client";
import { AxiosRequestConfig } from "axios";

const useData = <T>(endpoint: string, params?: AxiosRequestConfig, deps?: any, enabled: boolean = true) => {
  const fetchData = () =>
    apiClient
      .get<T>(endpoint, { ...params })
      .then((res) => res.data)
      .catch((err) => console.log("error in useData: ", err));

  return useQuery({
    queryKey: [endpoint, deps],
    queryFn: fetchData,
    staleTime: 10 * 60 * 1000,
    retry: 0,
    enabled,
  });
};

export default useData;
