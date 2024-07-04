import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { PASSWORD_REGEX } from '../../constants';
import { loginUser } from '../../firebase/api';
import { Button, Input, Form } from '../ui';
import { FormProps } from './Forms.types';

type Inputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .email('Invalid email.')
    .max(255, 'Email must me maximum 255 characters.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(20, 'Password must be maximum 20 characters long.')
    .regex(
      PASSWORD_REGEX,
      'Password must contain one uppercase, one lowercase, one number and no special characters.',
    ),
});

const LoginForm = ({ isSubmitting, setIsSubmitting }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const handleLogin: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsSubmitting!(true);

    try {
      await loginUser({ email, password });
    } catch (error) {
      let message = 'Something went wrong.';

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setIsSubmitting!(false);
    }
  };

  return (
    <Form
      className="flex w-full max-w-[450px] flex-col gap-5"
      onSubmit={handleSubmit(handleLogin)}
      noValidate
    >
      <div>
        <Input
          {...register('email')}
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email..."
          className="block w-full rounded-xl bg-sky-800 px-4 py-2 leading-8 ring-1 ring-inset ring-sky-800 transition-colors duration-300 placeholder:text-gray-300 placeholder-shown:bg-sky-800 placeholder-shown:bg-opacity-50 focus:ring-2 focus:ring-sky-500"
        />
        {errors.email && (
          <p className="pl-1 pt-0.5 text-sm leading-4 text-red-300">
            {errors.email?.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          id="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Password..."
          className="block w-full rounded-xl bg-sky-800 px-4 py-2 leading-8 ring-1 ring-inset ring-sky-800 transition-colors duration-300 placeholder:text-gray-300 placeholder-shown:bg-sky-800 placeholder-shown:bg-opacity-50 focus:ring-2 focus:ring-sky-500"
        />

        {errors.password && (
          <p className="pl-1 pt-0.5 text-sm leading-4 text-red-300">
            {errors.password?.message}
          </p>
        )}
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full min-w-max max-w-[50%] rounded-xl bg-sky-500 px-3 py-2 text-lg leading-8 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {isSubmitting ? 'Submitting...' : 'Sign In'}
      </Button>
    </Form>
  );
};

export default LoginForm;