import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getDocument } from '../../firebase/api';
import { Chat } from '../../firebase/types';
import { useUserStore } from '../../store/userStore';
import { Avatar } from '../ui';

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const { user } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', user?.id || ''),
      async (res) => {
        if (!res.exists()) {
          return;
        }

        const items = res.data().chats as Chat[];

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
  }, [user?.id]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="scroll-default flex-1 overflow-y-auto overflow-x-hidden px-5 pb-3">
        {chats.map((chat) => (
          <div className="flex cursor-pointer items-center gap-2 border-b border-slate-600 py-2 md:gap-5">
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
        ))}
      </div>
    </div>
  );
};

export default ChatList;
