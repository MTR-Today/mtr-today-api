export const normalizeStopName = (name: string) =>
  name
    .replace('-', ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
