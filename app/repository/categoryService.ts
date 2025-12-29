import useData from "@/app/hooks/useData";
import { Category } from "@/app/types/model";
import { BannerCategoryType } from "@/app/types/types";
import { ListResponse } from "../types/dto";

interface CategoryParams {
  type: BannerCategoryType;
}

export const useCategoryList = (params: CategoryParams) =>
  useData<ListResponse<Category>>("/category", { params }, [params]);
