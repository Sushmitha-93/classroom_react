import React, { Component } from "react";
import { Link } from "react-router-dom";

class StudentTable extends Component {
  state = {
    col: [
      { label: "Roll", path: "rollno" },
      { label: "Name", path: "name" },
      { label: "Class", path: "class" }
    ]
  };

  raiseSort = col => {
    const { sort, onSort } = this.props;
    if (col === sort.column) sort.order = sort.order === "asc" ? "desc" : "asc";
    else {
      sort.column = col;
      sort.order = "asc";
    }
    onSort(sort);
  };

  render() {
    const { students } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {this.state.col.map(col => (
              <th
                className="clickable"
                key={col.path}
                onClick={() => this.raiseSort(col.path)}
              >
                {col.label}
              </th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
              />
            </td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
              />
            </td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
              />
            </td>
            <td></td>
            <td></td>
          </tr>
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
