import { useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Button, Form, Input, Loader } from '../ui';
import { addChat, searchUsers } from '../../firebase/api';
import { useUserStore } from '../../store/userStore';
import { useChatsStore } from '../../store/chatsStore';
import { User } from '../../firebase/types';
import ModalLayout from './ModalLayout';

const AddUserModal = ({ onClose }: { onClose: () => void }) => {
  const { user: currentUser } = useUserStore();
  const { chats } = useChatsStore();

  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === '') {
      return;
    }

    setIsLoading(true);

    try {
      const allFoundUsers = await searchUsers(value);

      const alreadyAddedUsers = chats?.map((chat) => chat.user) || [];
      const alreadyAddedUserIds = alreadyAddedUsers.map((user) => user?.id);

      const users = allFoundUsers.filter(
        (user) =>
          user.id !== currentUser?.id && !alreadyAddedUserIds.includes(user.id),
      );

      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (addedUser: User) => {
    try {
      await addChat(currentUser, addedUser);
      onClose();
      toast.success('New chat successfully added!');
    } catch (error) {
      toast.error('Something went wrong. Try again later.');
      console.log(error);
    }
  };

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (users?.length === 0) {
    content = <p>No new users found.</p>;
  } else if (!users) {
    content = <p>Search for users to start chatting!</p>;
  } else {
    content = users?.map((user) => (
      <div
        key={user?.id}
        className="flex items-center gap-5 rounded-lg border border-slate-600 bg-slate-500 px-2 py-1"
      >
        <Avatar src={user?.avatar || '/avatar.png'} />

        <h5 className="flex-1 text-lg">{user?.username}</h5>

        <Button
          onClick={() => handleAdd(user)}
          className="rounded-lg bg-sky-700 px-2 py-1 transition-colors hover:bg-sky-600"
        >
          Add user
        </Button>
      </div>
    ));
  }

  return (
    <ModalLayout onClose={onClose}>
      <div className="fixed left-[30%] right-[20%] top-[20%] z-20 flex max-h-[60%] min-h-[20%] flex-col rounded-lg bg-slate-800 p-6 text-white">
        <Form onSubmit={handleSearch} className="flex items-center gap-5">
          <div className="flex w-full items-center gap-1 rounded-lg bg-slate-600 bg-opacity-50 p-1">
            <img
              src="/search.png"
              width={20}
              height={20}
              className="mx-2"
              alt="Search"
            />
            <Input
              id="searchNewUsers"
              name="searchNewUsers"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg p-1"
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="rounded-lg bg-sky-700 px-3 py-2 transition-colors hover:bg-sky-600"
          >
            Search
          </Button>
        </Form>

        <div className="scroll-default mt-4 flex flex-1 flex-col gap-2 overflow-y-auto">
          {content}
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddUserModal;
