import { create } from 'zustand';
import { UserChat } from '../firebase/types';
import { useUserStore } from './userStore';
import { StateChatId, StateUser } from './types';

type ChatsState = {
  user: StateUser;
  chats: UserChat[] | null;
  chatId: StateChatId;
  isLoading: boolean;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;

  setChats: (chats: UserChat[]) => void;
  changeChat: (chatId: StateChatId, user: StateUser) => void;
  changeBlock: () => void;
};

export const useChatsStore = create<ChatsState>((set) => ({
  user: null,
  chats: null,
  chatId: null,
  isLoading: true,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  setChats: (chats) => set((state) => ({ ...state, chats })),
  changeChat: (chatId, user) => {
    if (chatId === null || user === null) {
      return;
    }

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
