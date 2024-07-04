import Settings from './Settings';
import UserInfo from './UserInfo';

const RightPanel = () => {
  return (
    <div className="flex flex-1 flex-col">
      <UserInfo />
      <Settings />
    </div>
  );
};

export default RightPanel;
