import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getStudents, deleteStudent } from "../services/studentServices";

import Table from "./table";

class Students extends Component {
  state = {
    students: [],

    cols: [
      { label: "Roll", path: "rollno" },
      { label: "Name", path: "name" },
      { label: "Class", path: "class" },
      {
        label: "",
        content: (student) => (
          <button
            type="button"
            className="close"
            data-toggle="tooltip"
            title="Delete"
            onClick={() => this.handleDelete(student)}
          >
            &times;
          </button>
        ),
      },
      {
        label: "",
        content: (student) => (
          <Link
            to={"/studentForm/" + student._id}
            data-toggle="tooltip"
            title="Edit"
          >
            <i className="fas fa-user-edit"></i>
          </Link>
        ),
      },
    ],
    sort: { column: "rollno", order: "asc" },
  };

  async componentDidMount() {
    // Do get request to Student API to get student info
    const response = await getStudents();
    console.log(response);
    this.setState({ students: response.data });
  }

  handleDelete = async (student) => {
    console.log("Handle delete: ", student);
    const originalStudents = this.state.students;
    const students = originalStudents.filter(
      (stud) => stud._id !== student._id
    );
    this.setState({ students });

    try {
      await deleteStudent(student._id);
    } catch (ex) {
      console.log(ex);
      this.setState({ students: originalStudents });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Students</h1>

            <div className="ml-auto mr-3">
              <Link to="/studentForm/new">
                <button type="button" className="btn btn-primary btn-lg">
                  Add Student&nbsp;&nbsp;
                  <i className="fas fa-user-plus"></i>
                </button>
              </Link>
            </div>
          </div>

          <Table
            rows={this.state.students}
            rowEditLink={"/studentForm/"}
            cols={this.state.cols}
            onDelete={this.handleDelete}
            sort={this.state.sort}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
