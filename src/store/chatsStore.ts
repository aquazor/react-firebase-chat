import { create } from 'zustand';
import { User } from '../firebase/types';
import { useUserStore } from './userStore';

type ChatsState = {
  user: User | null;
  chatId: string | null;
  isLoading: boolean;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chatId: string, user: User) => void;
  changeBlock: () => void;
};

export const useChatsStore = create<ChatsState>((set) => ({
  chatId: null,
  user: null,
  isLoading: true,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().user;

    if (!currentUser) {
      return;
    }

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
