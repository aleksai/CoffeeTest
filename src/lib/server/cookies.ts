export const getUser = (cookies, noset) => {
  const user = cookies.get("user") || crypto.randomUUID();
  if (!noset) {
    cookies.set("user", user, { path: "/" });
  }
  return user;
};
