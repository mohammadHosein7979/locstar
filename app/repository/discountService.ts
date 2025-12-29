import useData from "../hooks/useData";
import { ListResponse } from "../types/dto";
import { Discount } from "../types/model";
import apiClient from "./api-client";

export const getDiscountService = (location_id: number) => {
  return apiClient.post("/discount", { location_id });
};

export const expireDiscountService = (id: number) => {
  return apiClient.put(`/owner/discount/${id}/expire`);
};

export const useDiscountList = () =>
  useData<ListResponse<Discount>>("/discount");
