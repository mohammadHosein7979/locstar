import { Location } from "@/app/types/model";
import { create } from "zustand";

interface UpdateLocationStore {
  location: Location;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
}

const useUpdateLocationStore = create<UpdateLocationStore>((set) => ({
  location: {} as Location,

  setLocation: (location) => set(() => ({ location })),

  clearLocation: () => set(() => ({ location: {} as Location })),
}));

export default useUpdateLocationStore;
