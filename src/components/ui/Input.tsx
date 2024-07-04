import { forwardRef } from 'react';

type InputProps = React.ComponentProps<'input'> & {
  id: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, value, onChange, ...rest }, ref) => {
    return (
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
