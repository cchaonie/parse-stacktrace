export const parseCookie = (cookie: string) => {
  const segments = cookie.split(";");
  return segments.reduce((a, c) => {
    const [name, value = ""] = c.split("=");
    if (a[name] && Array.isArray(a[name])) {
      a[name].push(value);
    } else {
      a[name] = value;
    }
    return a;
  }, {});
};
