import React, { Component } from "react";
import { getStudents, deleteStudent } from "../services/studentServices";

class Students extends Component {
  state = {
    students: []
  };

  async componentDidMount() {
    const response = await getStudents();
    console.log(response);
    this.setState({ students: response.data });
  }

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
                    <button type="button" className="close">
                      &times;
                    </button>
                  </td>
                  <td>
                    <i class="fas fa-user-edit"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" class="btn btn-primary btn-lg">
            Add Student&nbsp;&nbsp;
            <i class="fas fa-user-plus"></i>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
