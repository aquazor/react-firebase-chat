import { create } from 'zustand';
import { getDocument } from '../firebase/api';
import { User } from '../firebase/types';

type userState = {
  user: User | null;
  isLoading: boolean;
  fetchUserInfo: (uid: string | undefined) => Promise<void>;
};

export const useUserStore = create<userState>((set) => ({
  user: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      return set({ user: null, isLoading: false });
    }

    try {
      const user = await getDocument('users', uid);

      set({ user, isLoading: false });
    } catch (error) {
      return set({ user: null, isLoading: false });
    }
  },
}));
