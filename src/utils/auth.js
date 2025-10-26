const SESSION_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users";
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch (e) {
    return null;
  }
}
export function setSession(obj) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(obj));
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
export function signup({ username, password, confirmpassword }) {
  if (!username || !password || !confirmpassword)
    throw new Error("Username, password and confirmpassword required");
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  if (users.find((u) => u.username === username))
    throw new Error("User exists");
  if (password !== confirmpassword) throw new Error("mismatch password");
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}
export function login({ username, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const found = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!found) throw new Error("Invalid credentials");
  const token = btoa(username + ":" + Date.now());
  const session = { token, user: username };
  setSession(session);
  return session;
}
export function isAuthenticated() {
  return !!getSession();
}
export function currentUser() {
  const s = getSession();
  return s ? s.user : null;
}
