const Form = ({ children, ...rest }: React.ComponentProps<'form'>) => {
  return <form {...rest}>{children}</form>;
};

export default Form;
