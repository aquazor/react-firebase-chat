const Loader = ({
  width = 60,
  height = 'auto',
  className,
}: {
  width?: number;
  height?: number | 'auto';
  className?: string;
}) => {
  return (
    <div className={className}>
      <div style={{ width, height }} className="loader"></div>
    </div>
  );
};

export default Loader;
