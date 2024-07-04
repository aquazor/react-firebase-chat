import { Avatar } from '../ui';

const ReceiverInfoPanel = () => {
  return (
    <div className="flex items-center justify-between gap-5 p-5">
      <div className="flex items-center gap-5">
        <Avatar src="/avatar.png" alt="Avatar" width={60} height={60} />

        <div className="max-w-[15vw] sm:max-w-[20vw]">
          <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold">
            Alexandr Kornevskyi
          </h4>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            aspernatur, dolores blanditiis, solilique, provident veritatis
            doloremque ipsam nesciunt autem praesentium nam?
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 *:h-[20px] *:w-[20px]">
        <img src="/phone.png" alt="Phone" />
        <img src="/video.png" alt="Vhone" />
        <img src="/info.png" alt="info" />
      </div>
    </div>
  );
};

export default ReceiverInfoPanel;
