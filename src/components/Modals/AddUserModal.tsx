import { useState } from 'react';
import { Avatar, Button, Form, Input } from '../ui';
import ModalLayout from './ModalLayout';
import { addChat, searchUser } from '../../firebase/api';
import { User } from '../../firebase/types';
import { useUserStore } from '../../store/userStore';

const AddUserModal = ({ onClose }: { onClose: () => void }) => {
  const { user: currentUser } = useUserStore();
  const [users, setUsers] = useState<User[]>([]);
  const [value, setValue] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await searchUser(value);
      setUsers(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (addedUser: User) => {
    try {
      await addChat(currentUser!, addedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalLayout onClose={onClose}>
      <div className="fixed left-[30%] right-[20%] top-[20%] z-20 flex max-h-[60%] min-h-[20%] flex-col rounded-lg bg-slate-800 p-6 text-white">
        <Form onSubmit={handleSearch} className="flex items-center gap-5">
          <div className="flex w-full items-center gap-1 rounded-lg bg-slate-600 bg-opacity-50 p-2">
            <img src="/search.png" width={20} height={20} alt="Search" />
            <Input
              id="searchUser"
              name="searchUser"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search..."
              className="w-full px-1"
            />
          </div>

          <Button
            type="submit"
            className="rounded-lg bg-sky-700 px-3 py-2 transition-colors hover:bg-sky-600"
          >
            Search
          </Button>
        </Form>

        <div className="scroll-default mt-4 flex flex-1 flex-col gap-2 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-5 rounded-lg border border-slate-600 bg-slate-500 px-2 py-1"
            >
              <Avatar src={user.avatar || '/avatar.png'} />

              <h5 className="flex-1 text-lg">{user.username}</h5>

              <Button
                onClick={() => handleAdd(user)}
                className="rounded-lg bg-sky-700 px-2 py-1 transition-colors hover:bg-sky-600"
              >
                Add user
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddUserModal;
