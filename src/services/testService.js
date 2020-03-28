import http from "./httpService";

export function getTests(test) {
  return http.get("/tests?class=" + test.class + "&month=" + test.month);
}
