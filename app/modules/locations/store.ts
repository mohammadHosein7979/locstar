import { create } from "zustand";
import { LocationQuery } from "./_types/dto";
import { SortDirection } from "./_types/types";

interface LocationQueryStore {
  locationQuery: LocationQuery;
  setSearchText: (searchText: string) => void;
  setCityId: (cityId: number) => void;
  setCategoryId: (categoryId: number) => void;
  setSort: (sort: string) => void;
  setSortDirection: (sortDirection: SortDirection) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  clearCity: () => void;
  clearCategory: () => void;
  clearSort: () => void;
}

const useLocationQueryStore = create<LocationQueryStore>((set) => ({
  locationQuery: {
    page: 1,
    per_page: 12,
  },

  setSearchText: (searchText) =>
    set(() => ({
      locationQuery: { name: searchText },
    })),

  setCityId: (cityId) =>
    set((store) => ({
      locationQuery: { ...store.locationQuery, city_id: cityId },
    })),

  setCategoryId: (categoryId) =>
    set((store) => ({
      locationQuery: { ...store.locationQuery, category_id: categoryId },
    })),

  setSort: (sort) =>
    set((store) => ({
      locationQuery: { ...store.locationQuery, sort },
    })),

  setSortDirection: (sortDirection) =>
    set((store) => ({
      locationQuery: { ...store.locationQuery, sort_direction: sortDirection },
    })),

  setPage: (page) =>
    set((store) => ({
      locationQuery: { ...store.locationQuery, page },
    })),

  setPerPage: (perPage) =>
    set((store) => ({
      locationQuery: { ...store.locationQuery, per_page: perPage },
    })),

  clearCity: () =>
    set((store) => {
      const rest = { ...store.locationQuery };
      delete rest.city_id;
      return { locationQuery: rest };
    }),

  clearCategory: () =>
    set((store) => {
      const rest = { ...store.locationQuery };
      delete rest.category_id;
      return { locationQuery: rest };
    }),

  clearSort: () =>
    set((store) => {
      const rest = { ...store.locationQuery };
      delete rest.sort;
      delete rest.sort_direction;
      return { locationQuery: rest };
    }),
}));

export default useLocationQueryStore;
