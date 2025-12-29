import { Category, City, Location } from "./model";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireTime: number;
  refreshTokenExpireTime: number;
}

export interface Response<T> {
  data: T;
}

export interface ListResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface SearchResponse {
  categories: Category[];
  cities: City[];
  locations: Location[]
}