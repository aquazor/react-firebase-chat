import { useState } from 'react';

type DropdownProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};

const Dropdown = ({ title, children }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer select-none items-center justify-between gap-3 border-b border-slate-600 pb-2"
      >
        <span>{title}</span>

        <div className="shrink-0 rounded-full bg-slate-700 p-2">
          <img
            src={open ? '/arrowUp.png' : '/arrowDown.png'}
            width={15}
            height={15}
            alt="Arrow"
          />
        </div>
      </div>

      {open && children}
    </>
  );
};

export default Dropdown;
