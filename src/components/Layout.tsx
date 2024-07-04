import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useUserStore } from '../store/userStore';

const Layout = ({ children }: React.PropsWithChildren) => {
  const { fetchUserInfo, isLoading } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => unSub();
  }, [fetchUserInfo]);

  return (
    <div className="mx-auto flex h-[90vh] w-[90vw] rounded-2xl border border-slate-700 bg-slate-800 bg-opacity-75 text-white backdrop-blur-sm">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Layout;
