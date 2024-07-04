import { Avatar } from '../ui';

const UserInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border-b border-slate-600 p-5">
      <div>
        <Avatar width={80} height={80} src="/avatar.png" />
      </div>

      <h4 className="max-w-[15vw] overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold sm:max-w-[20vw]">
        Alexandr Kornevskyi
      </h4>

      <p className="max-w-[15vw] overflow-hidden text-ellipsis whitespace-nowrap text-slate-200 sm:max-w-[20vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A aspernatur,
        dolores blanditiis, solilique, provident veritatis doloremque ipsam
        nesciunt autem praesentium nam?
      </p>
    </div>
  );
};

export default UserInfo;
