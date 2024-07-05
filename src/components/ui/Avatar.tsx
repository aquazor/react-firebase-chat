type AvatarProps = React.ComponentProps<'img'> & {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  rounded?: boolean;
  cover?: boolean;
  alt?: string;
};

const Avatar = ({
  src,
  alt = 'Avatar',
  width = 50,
  height = 50,
  rounded = true,
  cover = true,
  className,
  ...rest
}: AvatarProps) => {
  const finalClassName = `${rounded ? 'rounded-full' : ''}${cover ? ' object-cover' : ''} ${className}`;

  return (
    <img
      style={{ width, height }}
      src={src}
      width={width}
      height={height}
      className={finalClassName}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = '/avatar.png';
        e.currentTarget.onerror = null;
      }}
      {...rest}
    />
  );
};

export default Avatar;
