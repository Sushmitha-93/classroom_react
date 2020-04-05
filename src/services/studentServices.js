import http from "./httpService";

export function getStudents(queryString) {
  return http.get("/students" + (queryString ? queryString : ""));
}

export function getStudent(studentId) {
  return http.get("/students/" + studentId);
}

export function deleteStudent(movieId) {
  return http.delete("/students/" + movieId);
}

export function saveStudent(student) {
  // if '_id' property is there, then its a PUT request otherwise its POST request.
  if (student._id) {
    return http.put("/students/" + student._id, {
      name: student.name,
      rollno: student.rollno,
      class: student.class,
      phone: student.phone,
      gender: student.gender,
      address: student.address
    });
  } else return http.post("/students/", student);
}
