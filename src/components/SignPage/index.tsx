import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const SignPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex w-full justify-between gap-5 px-10 py-5">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="mb-10 text-4xl">Login</h2>

        <LoginForm
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>

      <div className="h-full w-1 rounded-xl bg-slate-600"></div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="mb-10 text-4xl">Register</h2>

        <RegisterForm
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
  );
};

export default SignPage;
