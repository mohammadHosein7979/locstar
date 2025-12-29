import useData from "../hooks/useData";
import { ListResponse } from "../types/dto";
import { BlogList } from "../types/model";

interface BlogParams {
  page?: number;
  per_page?: number;
}

export const useBlogList = (params?: BlogParams) =>
  useData<ListResponse<BlogList>>("/post", { params }, [params]);