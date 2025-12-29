import useData from "../hooks/useData";
import { ListResponse } from "../types/dto";
import { City } from "../types/model";

interface CityParams {
  name?: string;
}

export const useCityList = (params?: CityParams) =>
  useData<ListResponse<City>>("/city", { params }, [params]);
