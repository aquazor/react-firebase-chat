import { useState } from 'react';
import { Avatar, Button, Input } from '../ui';
import ModalLayout from './ModalLayout';

const AddUserModal = ({ onClose }: { onClose: () => void }) => {
  const [value, setValue] = useState('');

  return (
    <ModalLayout onClose={onClose}>
      <div className="fixed bottom-[30%] left-[30%] right-[30%] top-[30%] z-20 flex flex-col rounded-lg bg-slate-800 p-6 text-white">
        <div className="flex items-center gap-5">
          <div className="flex w-full items-center gap-1 rounded-lg bg-slate-600 bg-opacity-50 p-2">
            <img src="/search.png" width={20} height={20} alt="Search" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search..."
              className="w-full px-1"
            />
          </div>

          <Button className="rounded-lg bg-sky-700 px-3 py-2">Search</Button>
        </div>

        <div className="scroll-default mt-4 flex flex-1 flex-col gap-2 overflow-y-auto">
          <div className="flex items-center gap-5 rounded-lg border border-slate-600 bg-slate-500 px-2 py-1">
            <Avatar src="/avatar.png" />

            <h5 className="flex-1 text-lg">Alex</h5>

            <Button className="rounded-lg bg-sky-700 p-1">Add user</Button>
          </div>

          <div className="flex items-center gap-5 rounded-lg bg-slate-500 p-2">
            <Avatar src="/avatar.png" />

            <h5 className="flex-1 text-lg">Alex</h5>

            <Button className="rounded-lg bg-sky-700 p-1">Add user</Button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddUserModal;
