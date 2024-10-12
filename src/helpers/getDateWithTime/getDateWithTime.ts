export function getDateWithTime(currentDate: Date = new Date()) {
  const options = {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return new Intl.DateTimeFormat('en-GB', options).format(currentDate);
}
