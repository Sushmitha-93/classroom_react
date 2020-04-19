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
      branch: student.branch,
      sem: student.sem,
      section: student.section,
      USN: student.USN,
      phone: student.phone,
      gender: student.gender,
      address: student.address,
    });
  } else return http.post("/students/", student);
}

export function saveStudTestMarks(testObj) {
  return http.put("/students/marksSheet", {
    studId: testObj.studId,
    testId: testObj.testId,
    subName: testObj.subName,
    marks: testObj.marks,
  });
}
