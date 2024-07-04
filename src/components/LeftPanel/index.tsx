import ChatList from './ChatList';
import SearchPanel from './SearchPanel';
import UserInfo from './UserInfo';

const LeftPanel = () => {
  return (
    <div className="flex flex-1 flex-col">
      <UserInfo />
      <SearchPanel />
      <ChatList />
    </div>
  );
};

export default LeftPanel;
