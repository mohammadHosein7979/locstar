import { create } from "zustand";
import { User } from "../types/model";

interface UpdateInfo {
  name?: string;
  family?: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  updateInfo: (data: UpdateInfo) => void;
  updateAvatar: (avatar: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {} as User,

  setUser: (data) => set(() => ({ user: { ...data } })),

  updateInfo: (data) =>
    set((store) => ({
      user: { ...store.user, ...data },
    })),

  updateAvatar: (avatar) =>
    set((store) => ({
      user: { ...store.user, avatar },
    })),
}));

export default useUserStore;
