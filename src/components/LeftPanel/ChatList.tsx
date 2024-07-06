import { useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getDocument } from '../../firebase/api';
import { UserChat } from '../../firebase/types';
import { useUserStore } from '../../store/userStore';
import { useChatsStore } from '../../store/chatsStore';
import { Avatar } from '../ui';

const ChatList = () => {
  const { user: sender } = useUserStore();
  const { chats, setChats, changeChat, chatId } = useChatsStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', sender?.id || ''),
      async (res) => {
        if (!res.exists()) {
          return;
        }

        const items = res.data().chats as UserChat[];

        const promises = items.map(async (item) => {
          const receiverUser = await getDocument('users', item.receiverId);

          return { ...item, user: receiverUser };
        });

        const chatData = await Promise.all(promises);

        setChats(
          chatData.sort((a, b) => Number(a.updatedAt) - Number(b.updatedAt)),
        );
      },
    );

    return () => unSub();
  }, [sender?.id, setChats]);

  const handleChatSelect = async (chat: UserChat) => {
    if (chatId === chat.chatId) {
      return;
    }

    const userChats = chats?.map((item) => {
      const { user: _, ...rest } = item;

      return rest;
    });

    const chatIndex = userChats?.findIndex(
      (item) => item.chatId === chat.chatId,
    );

    if (userChats === undefined || chatIndex === undefined) {
      return;
    }

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, 'userchats', sender!.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });

      changeChat(chat.chatId, chat.user!);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="scroll-default flex-1 overflow-y-auto overflow-x-hidden px-5 pb-3">
        {!chats ? (
          <div className="flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          chats?.map((chat) => (
            <div
              key={chat.chatId}
              onClick={() => handleChatSelect(chat)}
              className={`relative flex cursor-pointer items-center gap-2 border-b ${!chat.isSeen ? 'border-sky-400' : 'border-slate-600'} py-2 md:gap-5`}
            >
              {!chat.isSeen && (
                <div className="absolute right-0 top-[10px] h-[12px] w-[12px] rounded-full bg-sky-400"></div>
              )}
              <Avatar src={chat.user?.avatar || '/avatar.png'} alt="Avatar" />

              <div className="max-w-[16vw]">
                <h5 className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                  {chat.user?.username}
                </h5>
                <p className="min-h-3 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-300">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
