import { useChatsStore } from '../../store/chatsStore';
import ReceiverInfo from './ReceiverInfo';
import ChatControls from './ChatControls';
import ChatWindow from './ChatWindow';

const CenterPanel = () => {
  const { chatId } = useChatsStore();

  return (
    <div className="relative flex flex-[2] flex-col border-l border-r border-slate-700">
      {!chatId ? (
        <div className="mt-[50px] flex h-full flex-col items-center p-5">
          <img src="/empty-folder.png" width={200} alt="Empty folder" />

          <p className="w-full text-center text-xl">
            <img
              src="/left-arrow.png"
              className="absolute -left-3 top-[110px]"
              style={{
                width: 60,
                height: 24,
              }}
              alt="Arrow"
            />
            Please, select an existing chat from the list to continue your
            conversation
          </p>

          <p className="text-xl">
            Or <span className="font-bold text-sky-400">Add</span> a new user to
            start a new chat. Let's get chatting!
          </p>
        </div>
      ) : (
        <>
          <ReceiverInfo />
          <ChatWindow />
          <ChatControls />
        </>
      )}
    </div>
  );
};

export default CenterPanel;
