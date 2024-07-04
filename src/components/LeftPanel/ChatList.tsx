import { Avatar } from '../ui';
import SearchPanel from './SearchPanel';

const ChatList = () => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SearchPanel />

      <div className="scroll-default flex-1 overflow-y-auto overflow-x-hidden px-5 pb-3">
        {[...Array(10)].map(() => (
          <div className="flex cursor-pointer items-center gap-2 border-b border-slate-600 py-2 md:gap-5">
            <Avatar src="/avatar.png" alt="Avatar" />

            <div className="max-w-[16vw]">
              <h5 className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                Alex
              </h5>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium eligendi quod ex officiis facere beatae architecto,
                quis ipsam voluptatum similique. Placeat ipsa quidem est error
                ut aperiam dolorem omnis voluptatem?
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
