import { useState } from 'react';
import { sendMessage } from '../../firebase/api';
import { Input, Button } from '../ui';
import { useChatsStore } from '../../store/chatsStore';
import { useUserStore } from '../../store/userStore';
import EmojiMenu from './EmojiMenu';

const ChatControls = () => {
  const { chatId, user: receiver } = useChatsStore();
  const { user: sender } = useUserStore();

  const [value, setValue] = useState('');

  const handleSendMessage = async () => {
    if (value.trim() === '') {
      return;
    }

    try {
      await sendMessage(chatId!, sender!.id, receiver!.id, value);
      setValue('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <div className="flex items-center gap-2 *:h-[24px] *:w-[24px]">
        <img src="/img.png" alt="Img" />
        <img src="/camera.png" alt="Camera" />
        <img src="/mic.png" alt="Mic" />
      </div>

      <div className="flex flex-1 items-center gap-1 rounded-lg bg-slate-600 bg-opacity-50 p-1">
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="chat"
          name="chat"
          autoComplete="off"
          placeholder="Type a message..."
          className="w-full rounded-lg p-1"
        />
      </div>

      <EmojiMenu setValue={setValue} />

      <Button
        onClick={handleSendMessage}
        className="rounded-lg bg-sky-700 px-3 py-2"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatControls;
