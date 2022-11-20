export const parseUrl = (url: string) => {
  const segments = url.split('/');
  if (url.startsWith('/')) {
    segments.shift();
  }
  if (url.endsWith('/')) {
    segments.pop();
  }
  return segments;
};
