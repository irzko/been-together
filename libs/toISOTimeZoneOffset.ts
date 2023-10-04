export default function toISOTimeZoneOffset(date: Date) {
  const pad = (num: number) => (num < 10 ? "0" : "") + num;

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
}