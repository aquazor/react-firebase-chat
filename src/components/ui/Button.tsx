type ButtonProps = React.ComponentProps<'button'> & {
  children: React.ReactNode;
};

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center${className ? ' ' + className : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
