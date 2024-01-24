export function getTime() {
  const date = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return new Intl.DateTimeFormat('ru', options).format(date);
}
