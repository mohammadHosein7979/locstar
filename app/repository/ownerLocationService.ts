import useData from "../hooks/useData";
import { ListResponse, Response } from "../types/dto";
import { Discount, Location, OwnerLocation } from "../types/model";
import apiClient from "./api-client";

export const useOwnerLocationList = () =>
  useData<ListResponse<Location>>("/owner/location");

interface DiscountParams {
  page?: number;
  per_page?: number;
  search?: string;
}
export const useOwnerDiscountList = (params?: DiscountParams) =>
  useData<ListResponse<Discount>>("/owner/discount", { params });

export const getOwnerLocation = (id: number) =>
  apiClient.get<Response<OwnerLocation>>(`/owner/location/${id}`);

export const addLocation = (data: FormData, id?: number) =>
  apiClient.post("/owner/location" + (id ? `/${id}` : ""), data);

export const updateFetures = (
  data: { features: number[] },
  id?: number
) =>
  apiClient.put(`owner/location/${id}/update-features`, data);

export const updateCategories = (
  data: { categories: number[] },
  id?: number
) =>
  apiClient.put(`owner/location/${id}/update-categories`, data);

export const updateDocuments = (data: FormData, id?: number) =>
  apiClient.post(`owner/location/documents/${id}`, data);
