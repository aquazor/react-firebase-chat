import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadAvatar } from '../../firebase/api';
import { useUserStore } from '../../store/userStore';
import { UploadImg } from '../../types';
import { Avatar } from '../ui';

const UploadAvatar = () => {
  const { user, setAvatar } = useUserStore();

  const [uploadedAvatar, setUploadedAvatar] = useState<UploadImg>({
    file: null,
    url: user?.avatar,
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length === 0 || !user?.id) {
      return;
    }

    const file = e.target.files[0];

    setUploadedAvatar({
      file,
      url: URL.createObjectURL(file),
    });

    try {
      const avatarUrl = await uploadAvatar(file, user.id);
      setAvatar(avatarUrl);
    } catch (error) {
      let message = 'Something went wrong.';

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="flex-shrink-0">
      <label
        className="flex cursor-pointer items-center justify-center"
        htmlFor="uploadAvatar"
      >
        <Avatar
          style={{ width: 60, height: 60 }}
          width={60}
          height={60}
          src={uploadedAvatar.url || '/avatar.png'}
        />
      </label>
      <input
        onChange={handleUpload}
        type="file"
        id="uploadAvatar"
        className="hidden"
        name="uploadAvatar"
      />
    </div>
  );
};

export default UploadAvatar;
