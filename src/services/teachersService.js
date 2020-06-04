import http from "./httpService";

export function getTeachers(queryObj) {
  let reqString = "/teachers?";

  Object.keys(queryObj).map(
    (key) => (reqString = reqString + key + "=" + queryObj[key] + "&")
  );

  return http.get(reqString);
}

export function deleteTeacher(id) {
  return http.delete("/teachers/" + id);
}

export function saveTeacher(teacher) {
  if (teacher._id) {
    console.log("saveTeacher call");
    return http.put("/teachers/" + teacher._id, teacher);
  } else return http.post("/teachers/", teacher);
}
