import { useUserStore } from '../../store/userStore';
import UploadAvatar from '../UploadAvatar';

const UserInfo = () => {
  const { user } = useUserStore();

  return (
    <div className="flex justify-between gap-2 p-5">
      <div className="flex items-center gap-5">
        <UploadAvatar />

        <h2 className="text-xl font-bold">{user?.username}</h2>
      </div>

      {/* <div className="flex items-center gap-5 *:h-[20px] *:w-[20px]">
        <img src="/more.png" alt="More" />
        <img src="/video.png" alt="Video" />
        <img src="/edit.png" alt="Edit" />
      </div> */}
    </div>
  );
};

export default UserInfo;
