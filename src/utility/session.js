import Cookies from "js-cookie";

const setSessionCookie = (SESSION_NAME, SESSION_VALUE) => {
  deleteSessionCookie(SESSION_NAME);
  Cookies.set(SESSION_NAME, SESSION_VALUE);
};

const getSessionCookie = (SESSION_NAME) => {
  const sessionCookie = Cookies.get(SESSION_NAME);
  return sessionCookie === undefined ? false : sessionCookie;
};

const deleteSessionCookie = (SESSION_NAME) => {
  Cookies.remove(SESSION_NAME);
};

export { setSessionCookie, getSessionCookie, deleteSessionCookie };
