import http from "./httpService";

export function getBranches() {
  return http.get("/branches");
}
