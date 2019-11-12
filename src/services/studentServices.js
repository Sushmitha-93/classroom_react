import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:3000/api";

export function getStudents() {
  return Axios.get("/students");
}

export function deleteStudent(movieId) {
  return Axios.delete("/students/" + movieId);
}

export function saveStudent(student) {
  // if '_id' property is there, then its a PUT request otherwise its POST request.
  if (student._id) {
    return Axios.put("/students/" + student._id, {
      name: student.name,
      rollno: student.rollno,
      class: student.class,
      phone: student.phone,
      gender: student.gender,
      address: student.address
    });
  } else return Axios.post("/students/", student);
}
