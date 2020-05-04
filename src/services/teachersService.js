import http from "./httpService";

export function getTeachers(queryObj) {
  let reqString = "/teachers?";

  Object.keys(queryObj).map(
    (key) => (reqString = reqString + key + "=" + queryObj[key] + "&")
  );

  return http.get(reqString);
}
