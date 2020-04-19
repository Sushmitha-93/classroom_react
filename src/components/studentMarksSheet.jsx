import React, { Component } from "react";
import { getStudent } from "../services/studentServices";

class StudentMarksSheet extends Component {
  state = {
    student: {
      marksSheet: [],
    },
  };

  handleSubmit = async (studId) => {
    const student = await getStudent(studId);
    this.setState({ student: student.data });
  };

  render() {
    const { student } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <h1>Student Marks Sheet</h1>
          <form
            className="form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit(e.target.studIdInput.value);
            }}
          >
            <label className="my-1 mr-3" htmlFor="classInput">
              Student ID
            </label>
            <input
              type="text"
              className="form-control col-md-2"
              id="studIdInput"
              placeholder="Ex: 123456"
            ></input>
          </form>

          <br />
          <div className="card">
            <div className="card-body">
              <strong>Name: </strong> {student.name}
              &emsp;
              <strong>Class: </strong>
              {student.class} &emsp; <strong>Roll no:</strong> {student.rollno}
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>

                {student.marksSheet.map((testObj) => (
                  <th scope="col">{testObj.testName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentMarksSheet;
