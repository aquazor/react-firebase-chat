import { useState } from 'react';
import { Button, Input } from '../ui';
import AddUserModal from '../Modals/AddUserModal';

const SearchPanel = () => {
  const [value, setValue] = useState('');
  const [addMode, setAddMode] = useState(false);

  const onClose = () => setAddMode(false);

  return (
    <div className="flex items-center gap-3 px-5 py-5">
      <div className="flex flex-1 items-center gap-1 rounded-lg bg-slate-600 bg-opacity-50 p-1">
        <img src="/search.png" width={20} height={20} alt="Search" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="w-full px-1"
        />
      </div>

      <Button
        onClick={() => setAddMode((curr) => !curr)}
        className="h-[30px] w-[30px] rounded-lg bg-slate-600 bg-opacity-50"
        type="button"
      >
        <img src="/plus.png" width={20} height={20} alt="add" />
      </Button>

      {addMode && <AddUserModal onClose={onClose} />}
    </div>
  );
};

export default SearchPanel;
