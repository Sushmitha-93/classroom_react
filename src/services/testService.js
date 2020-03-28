import http from "./httpService";

export function getTests(test) {
  return http.get("/tests?class=" + test.class + "&month=" + test.month);
}

export function postTests(test) {
  return http.post("/tests", test);
}
