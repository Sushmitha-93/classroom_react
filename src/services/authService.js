import Axios from "axios";
import jwt from "jsonwebtoken";

const keyName = "JWT received";

// for sign-up
export function setJwt(jwt) {
  localStorage.setItem(keyName, jwt);
}

// for logout
export function removeJwt(jwt) {
  localStorage.removeItem(keyName);
}

export function getJwt() {
  return localStorage.getItem(keyName);
}

// for nav-bar
export function getCurrentUser() {
  const token = localStorage.getItem(keyName);
  const decoded = jwt.decode(token);
  return decoded;
}

export function login(user) {
  return Axios.post("/login", user);
}
