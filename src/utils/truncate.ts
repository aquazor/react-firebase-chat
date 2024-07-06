export const truncate = (str: string | undefined | null, maxLength: number) => {
  if (typeof str !== 'string') {
    return;
  }

  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }

  return str;
};
