import { useUserStore } from './store/userStore';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import SignPage from './components/SignPage';
import Notification from './components/Notification';
import Layout from './components/Layout';

function App() {
  const { user } = useUserStore();

  return (
    <div className="flex h-full max-h-[100dvh] items-center justify-center overflow-hidden bg-slate-800 bg-main bg-cover bg-center bg-no-repeat">
      <Layout>
        {!user ? (
          <SignPage />
        ) : (
          <>
            <LeftPanel />
            <CenterPanel />
            <RightPanel />
          </>
        )}
      </Layout>
      <Notification />
    </div>
  );
}

export default App;
