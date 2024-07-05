export const convertSecondsToTimeString = (seconds: number) => {
  const milliseconds = seconds * 1000;

  const date = new Date(milliseconds);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
