import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Chat } from '../../firebase/types';
import { useChatsStore } from '../../store/chatsStore';
import { useUserStore } from '../../store/userStore';
import { convertSecondsToTimeString } from '../../utils/convertSecondsToTimeString';
import { Avatar } from '../ui';

const ChatWindow = () => {
  const { user: sender } = useUserStore();
  const { user: receiver, chatId, chats, changeChat } = useChatsStore();

  const [chat, setChat] = useState<Chat>();

  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);

    return () => clearTimeout(timeout);
  }, [chatId]);

  useEffect(() => {
    const userChats = chats?.map((item) => {
      const { user: _, ...rest } = item;

      return rest;
    });

    const chatIndex = userChats?.findIndex((item) => item.chatId === chatId);

    if (userChats === undefined || chatIndex === undefined) {
      return;
    }

    userChats[chatIndex].isSeen = true;

    const updateChats = async () => {
      const userChatsRef = doc(db, 'userchats', sender!.id);

      try {
        await updateDoc(userChatsRef, {
          chats: userChats,
        });

        changeChat(chatId, receiver);
      } catch (error) {
        console.log(error);
      }
    };

    updateChats();
  }, [changeChat, chatId, chats, receiver, sender]);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data() as Chat);
    });

    return () => unSub();
  }, [chatId]);

  return (
    <div className="scroll-default flex flex-1 flex-col gap-2 overflow-y-auto border-b border-t border-slate-700 p-5">
      {chat?.messages.map((message) => {
        const isMessageFromSender = message.senderId === sender?.id;

        return (
          <div
            key={message.createdAt.seconds}
            className={`flex max-w-[70%] ${isMessageFromSender ? 'self-end' : ''}`}
          >
            <div className="flex items-end gap-2">
              <div className="mb-4 shrink-0">
                <Avatar
                  width={40}
                  height={40}
                  src={
                    (isMessageFromSender ? sender?.avatar : receiver?.avatar) ||
                    '/avatar.png'
                  }
                />
              </div>

              <div className="flex flex-col items-start">
                {message?.img && (
                  <div className="mb-1">
                    <img
                      className="rounded-xl object-cover"
                      src={message?.img}
                      alt="Image"
                    />
                  </div>
                )}
                <p
                  className={`min-w-[30px] rounded-xl ${isMessageFromSender ? 'bg-sky-800 bg-opacity-75' : 'bg-slate-200 bg-opacity-20'} p-2`}
                >
                  {message?.text}
                </p>
                <span className="inline-block w-full pr-1 text-end text-xs text-slate-400">
                  {convertSecondsToTimeString(message?.createdAt.seconds)}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;
