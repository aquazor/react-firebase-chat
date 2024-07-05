import { useChatsStore } from '../../store/chatsStore';
import Settings from './Settings';
import UserInfo from './UserInfo';

const RightPanel = () => {
  const { chatId } = useChatsStore();

  return (
    <div className="flex flex-1 flex-col">
      {!chatId ? (
        <div className="flex h-full flex-col items-center justify-center p-5">
          <img src="/empty-folder.png" width={150} alt="Empty folder" />
        </div>
      ) : (
        <>
          <UserInfo />
          <Settings />
        </>
      )}
    </div>
  );
};

export default RightPanel;
