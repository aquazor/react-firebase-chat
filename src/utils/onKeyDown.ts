export const onKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  key: string,
  callback: () => void,
) => {
  if (e.key === key) {
    callback();
  }
};
