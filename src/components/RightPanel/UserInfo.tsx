import { useChatsStore } from '../../store/chatsStore';
import { Avatar } from '../ui';

const UserInfo = () => {
  const { user: receiver } = useChatsStore();

  return (
    <div className="flex flex-col items-center justify-center gap-3 border-b border-slate-600 p-5">
      <div>
        <Avatar
          src={receiver?.avatar || '/avatar.png'}
          width={80}
          height={80}
        />
      </div>

      <h4 className="max-w-[15vw] overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold sm:max-w-[20vw]">
        {receiver?.username}
      </h4>

      <p className="max-w-[15vw] overflow-hidden text-ellipsis whitespace-nowrap text-slate-200 sm:max-w-[20vw]">
        {receiver?.status}
      </p>
    </div>
  );
};

export default UserInfo;
