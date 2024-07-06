import { useChatsStore } from '../../store/chatsStore';

const ReceiverInfoPanel = () => {
  const { user: receiver } = useChatsStore();

  return (
    <div className="flex items-center justify-between gap-5 p-5">
      <div className="flex items-center gap-5">
        <div className="max-w-[15vw] sm:max-w-[20vw]">
          <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold">
            {receiver?.username}
          </h4>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-400">
            {receiver?.status}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 *:h-[20px] *:w-[20px]">
        <img src="/phone.png" alt="Phone" />
        <img src="/video.png" alt="Vhone" />
        <img src="/info.png" alt="info" />
      </div>
    </div>
  );
};

export default ReceiverInfoPanel;
