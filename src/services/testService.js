import http from "./httpService";

export function getTests(queryObj) {
  let request = "/tests?";
  Object.keys(queryObj).map(
    (k) => (request = request + k + "=" + queryObj[k] + "&")
  );
  return http.get(request);
}

export function postTests(test) {
  return http.post("/tests", test);
}

export function updateTest(id, updatedTestField) {
  return http.put("/tests/" + id, updatedTestField);
}
