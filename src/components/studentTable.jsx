import React, { Component } from "react";
import { Link } from "react-router-dom";

class StudentTable extends Component {
  state = {};
  render() {
    const { students } = this.props;
    return (
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
                  data-toggle="tooltip"
                  title="Delete"
                  onClick={() => this.props.onDelete(student)}
                >
                  &times;
                </button>
              </td>
              <td>
                <Link
                  to={"/studentForm/" + student._id}
                  data-toggle="tooltip"
                  title="Edit"
                >
                  <i className="fas fa-user-edit"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default StudentTable;
