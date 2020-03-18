import http from "./httpService"
import jwt from "jsonwebtoken";

const keyName = "JWT received";

// for sign-up
export function setJwt(jwt) {
  localStorage.setItem(keyName, jwt);
}

// calling setJWT method of httpService and passing JWT to it so that it can use that to set header in httpService.
// We are doing this because we cant import AuthService and call its getJWT to set header there. 
// Because AuthService already imports httpService, if we want AuthService's method, we'll have to import AuthService in httpService.
// That causes bi-directional dependency. so to avoid that we call a function there passing JWT as parameter from here.
http.setJWTinHeader(getJwt())

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
  return http.post("/login", user);
}
