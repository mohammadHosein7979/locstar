import { SortDirection } from "./types";

export interface LocationQuery {
    name?: string;
    city_id?: number;
    category_id?: number;
    sort?: string;
    sort_direction?: SortDirection;
    page?: number;
    per_page?: number
}