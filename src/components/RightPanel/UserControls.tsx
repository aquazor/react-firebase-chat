import { auth } from '../../firebase/firebase';
import { Button } from '../ui';

const UserControls = () => {
  return (
    <div className="flex flex-col gap-3 px-5 py-3">
      <Button className="w-full rounded-lg bg-red-700 p-2 uppercase transition-colors hover:bg-red-600">
        Block user
      </Button>

      <Button
        onClick={auth.signOut}
        className="w-full rounded-lg bg-slate-700 p-2 uppercase transition-colors hover:bg-slate-600"
      >
        Logout
      </Button>
    </div>
  );
};

export default UserControls;
