import React, { Component } from "react";
import { getTeachers, deleteTeacher } from "../../services/teachersService";
import { Link } from "react-router-dom";

import Table from "../table";

class Teachers extends Component {
  state = {
    teachers: [],
    cols: [
      { label: "ID", path: "tid" },
      { label: "Name", path: "name" },
      { label: "Branch", path: "branch" },
      {
        label: "",
        content: (teacher) => (
          <button
            type="button"
            className="close"
            data-toggle="tooltip"
            title="Delete"
            onClick={() => this.handleDelete(teacher)}
          >
            &times;
          </button>
        ),
      },
      {
        label: "",
        content: (teacher) => (
          <Link
            to={"/teacherForm/" + teacher._id}
            data-toggle="tooltip"
            title="Edit"
          >
            <i className="fas fa-user-edit"></i>
          </Link>
        ),
      },
    ],
    sort: { column: "tid", order: "asc" },
  };
  async componentDidMount() {
    const teachers = await getTeachers({});
    this.setState({ teachers: teachers.data });
  }

  async handleDelete(teacher) {
    const response = await deleteTeacher(teacher._id);
    //console.log(response);

    if (response.request.status === 200) {
      let teachers = this.state.teachers.filter((t) => t._id !== teacher._id);
      this.setState({ teachers });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Teachers</h1>

            <div className="ml-auto mr-3">
              <Link to="/teacherForm/new">
                <button type="button" className="btn btn-primary btn-lg">
                  Add Teacher&nbsp;&nbsp;
                  <i className="fas fa-user-plus"></i>
                </button>
              </Link>
            </div>
          </div>

          <Table
            rows={this.state.teachers}
            cols={this.state.cols}
            sort={this.state.sort}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Teachers;
