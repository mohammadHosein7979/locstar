import useData from "@/app/hooks/useData";
import { Feature, Location } from "@/app/types/model";
import { LocationQuery } from "../modules/locations/_types/dto";
import { ListResponse, Response, SearchResponse } from "../types/dto";
import apiClient from "./api-client";

export const useLocationList = (params?: LocationQuery) =>
  useData<ListResponse<Location>>("/location", { params }, [params]);

export const searchAction = (search: string) =>
  apiClient.get<Response<SearchResponse>>("/search", { params: { search } });

export const favoriteLocation = (
  isFavorite: boolean,
  locationId: number,
) => {
  if (isFavorite) {
    return apiClient.delete(`/favorite-location/${locationId}`);
  } else {
    return apiClient.post(`/favorite-location/${locationId}`, null);
  }
};

export const useFeatureList = () => useData<ListResponse<Feature>>("/feature");
