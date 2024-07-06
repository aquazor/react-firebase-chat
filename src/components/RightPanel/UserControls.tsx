import { auth } from '../../firebase/firebase';
import { useChatsStore } from '../../store/chatsStore';
import { Button } from '../ui';

const UserControls = () => {
  const { chatId } = useChatsStore();

  return (
    <div className="flex flex-col gap-3 px-5 pb-3 pt-5">
      {chatId && (
        <Button className="w-full rounded-lg bg-red-700 p-2 uppercase transition-colors hover:bg-red-600">
          Block user
        </Button>
      )}

      <Button
        onClick={() => auth.signOut()}
        className="w-full rounded-lg bg-slate-700 p-2 uppercase transition-colors hover:bg-slate-600"
      >
        Logout
      </Button>
    </div>
  );
};

export default UserControls;
