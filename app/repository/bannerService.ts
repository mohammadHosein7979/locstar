import useData from "@/app/hooks/useData";
import { Banner } from "@/app/types/model";
import { BannerCategoryType, BannerType } from "@/app/types/types";
import { ListResponse } from "../types/dto";

interface BannerParams {
  type: BannerType;
  model_type: BannerCategoryType;
  city_id: number;
  page?: number;
  per_page?: number;
}

export const useBannerList = (params: BannerParams) => {
  const filteredParams: Partial<BannerParams> = { ...params };

  if (filteredParams.city_id === 0) {
    delete filteredParams.city_id;
  }

  return useData<ListResponse<Banner>>("/banner", { params: filteredParams }, [filteredParams]);
};
