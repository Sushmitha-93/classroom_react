import http from "./httpService";

export function getSyllabus(queryObj) {
  let request = "/syllabus?";
  Object.keys(queryObj).map(
    (k) => (request = request + k + "=" + queryObj[k] + "&")
  );
  return http.get(request);
}
