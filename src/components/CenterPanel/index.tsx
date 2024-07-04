import ReceiverInfo from './ReceiverInfo';
import ChatControls from './ChatControls';
import ChatWindow from './ChatWindow';

const CenterPanel = () => {
  return (
    <div className="flex flex-[2] flex-col border-l border-r border-slate-700">
      <ReceiverInfo />
      <ChatWindow />
      <ChatControls />
    </div>
  );
};

export default CenterPanel;
