import { useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { sendMessage, uploadImg } from '../../firebase/api';
import { useChatsStore } from '../../store/chatsStore';
import { useUserStore } from '../../store/userStore';
import { onKeyDown } from '../../utils/onKeyDown';
import { Input, Button } from '../ui';
import EmojiMenu from './EmojiMenu';

const ChatControls = () => {
  const { user: sender } = useUserStore();
  const { user: receiver, chatId, setImg, img } = useChatsStore();

  const [value, setValue] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length === 0) {
      return;
    }

    const file = e.target.files[0];

    setImg({
      file,
      url: URL.createObjectURL(file),
    });
  };

  const handleSendMessage = async () => {
    if (value.trim() === '') {
      return;
    }

    let imgUrl = null;

    if (img.file) {
      imgUrl = await uploadImg(img.file);
    }

    try {
      await sendMessage(chatId!, sender!.id, receiver!.id, value, imgUrl);
      setImg({ file: null, url: '' });
      setValue('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <label
            className="flex cursor-pointer items-center justify-center"
            htmlFor="uploadImg"
          >
            <FaRegImage size={35} />
          </label>
          <input
            onChange={handleUpload}
            type="file"
            id="uploadImg"
            className="hidden"
            name="uploadImg"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center gap-1 rounded-lg bg-slate-600 bg-opacity-50 p-1">
        <Input
          onKeyDown={(e) => onKeyDown(e, 'Enter', handleSendMessage)}
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
