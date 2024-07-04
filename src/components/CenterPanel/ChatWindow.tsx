import { useEffect, useRef } from 'react';
import { Avatar } from '../ui';

const ChatWindow = () => {
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="scroll-default flex flex-1 flex-col gap-2 overflow-y-auto border-b border-t border-slate-700 p-5">
      <div className="flex max-w-[70%]">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>
          <div className="flex flex-col items-start">
            <p className="min-w-[30px] rounded-xl bg-slate-200 bg-opacity-20 p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              harum fuga doloribus dolor veritatis dolore non, iste officia
              magni voluptas! Dolor, sit non provident quod excepturi quisquam
              suscipit temporibus rem.
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>
      <div className="flex max-w-[70%]">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>
          <div className="flex flex-col items-start">
            <p className="min-w-[30px] rounded-xl bg-slate-200 bg-opacity-20 p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              harum fuga doloribus dolor veritatis dolore non, iste officia
              magni voluptas! Dolor, sit non provident quod excepturi quisquam
              suscipit temporibus rem.
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>
      <div className="flex max-w-[70%]">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>
          <div className="flex flex-col items-start">
            <p className="min-w-[30px] rounded-xl bg-slate-200 bg-opacity-20 p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              harum fuga doloribus dolor veritatis dolore non, iste officia
              magni voluptas! Dolor, sit non provident quod excepturi quisquam
              suscipit temporibus rem.
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>

      <div className="flex max-w-[70%] self-end">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>
          <div className="flex flex-col items-start">
            <p className="min-w-[30px] rounded-xl bg-sky-700 bg-opacity-75 p-2">
              ку
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>

      <div className="flex max-w-[70%] self-end">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>
          <div className="flex flex-col items-start">
            <p className="min-w-[30px] rounded-xl bg-sky-700 bg-opacity-75 p-2">
              .
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              23:59
            </span>
          </div>
        </div>
      </div>

      <div className="flex max-w-[70%]">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>

          <div className="flex flex-col items-start">
            <div className="mb-1">
              <img
                className="rounded-xl object-cover"
                src="https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/IW5r8hLVZzf0ApOyiOuRnKUe.png"
                alt=""
              />
            </div>
            <p className="min-w-[30px] rounded-xl bg-slate-200 bg-opacity-20 p-2">
              привет
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>

      <div className="flex max-w-[70%]">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>

          <div className="flex flex-col items-start">
            <div className="mb-1">
              <img
                className="rounded-xl object-cover"
                src="https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/IW5r8hLVZzf0ApOyiOuRnKUe.png"
                alt=""
              />
            </div>
            <p className="min-w-[30px] rounded-xl bg-slate-200 bg-opacity-20 p-2">
              привет
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>

      <div className="flex max-w-[70%]">
        <div className="flex items-end gap-2">
          <div className="mb-4 shrink-0">
            <Avatar width={40} height={40} src="/avatar.png" />
          </div>
          <div className="flex flex-col items-start">
            <p className="min-w-[30px] rounded-xl bg-slate-200 bg-opacity-20 p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              harum fuga doloribus dolor veritatis dolore non, iste officia
              magni voluptas! Dolor, sit non provident quod excepturi quisquam
              suscipit temporibus rem.
            </p>
            <span className="inline-block min-w-[30px] text-center text-xs text-slate-400">
              00:00
            </span>
          </div>
        </div>
      </div>

      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;
