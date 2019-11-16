import React, { Component } from "react";
import { getStudents, deleteStudent } from "../services/studentServices";
import { Link } from "react-router-dom";

class Students extends Component {
  state = {
    students: []
  };

  async componentDidMount() {
    const response = await getStudents();
    console.log(response);
    this.setState({ students: response.data });
  }

  handleDelete = async student => {
    console.log("Handle delete: ", student);
    const originalStudents = this.state.students;
    const students = originalStudents.filter(stud => stud._id !== student._id);
    this.setState({ students });

    try {
      await deleteStudent(student._id);
    } catch (ex) {
      console.log(ex);
      this.setState({ students: originalStudents });
    }
  };

  render() {
    const { students } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <h1>Students</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Name</th>
                <th>Class</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td>{student.rollno}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>
                    <button
                      type="button"
                      className="close"
                      onClick={() => this.handleDelete(student)}
                    >
                      &times;
                    </button>
                  </td>
                  <td>
                    <i className="fas fa-user-edit"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/studentForm/new">
            <button type="button" className="btn btn-primary btn-lg">
              Add Student&nbsp;&nbsp;
              <i className="fas fa-user-plus"></i>
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
