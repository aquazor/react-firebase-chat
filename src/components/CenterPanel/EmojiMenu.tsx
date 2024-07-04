import { useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Button from '../ui/Button';
import useClickOutside from '../../hooks/useClickOuside';

type EmojiMenuProps = {
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const EmojiMenu = ({ setValue }: EmojiMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  useClickOutside(menuRef, handleClose);

  const handleEmojiClick = (e: EmojiClickData) => {
    setValue((prev) => prev + e.emoji);
  };

  return (
    <div ref={menuRef} className="relative">
      <Button onClick={handleToggle}>
        <img src="emoji.png" alt="Emoji" width={30} />
      </Button>

      <div className="absolute bottom-10 left-0">
        <EmojiPicker
          lazyLoadEmojis
          open={open}
          onEmojiClick={handleEmojiClick}
        />
      </div>
    </div>
  );
};

export default EmojiMenu;
