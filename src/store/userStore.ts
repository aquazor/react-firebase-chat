import { create } from 'zustand';
import { getDocument } from '../firebase/api';
import { User } from '../firebase/types';

type UserState = {
  user: User | null;
  isLoading: boolean;
  setAvatar: (url: string) => void;
  fetchUserInfo: (uid: string | undefined) => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setAvatar: (url) =>
    set((state) => {
      if (state.user) {
        return { user: { ...state.user, avatar: url } };
      }
      return state;
    }),
  fetchUserInfo: async (uid) => {
    if (!uid) {
      return set({ user: null, isLoading: false });
    }

    try {
      const user = await getDocument('users', uid);
      set({ user, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));
