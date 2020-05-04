import React, { Component } from "react";
import { getTeachers } from "../services/teachersService";

import Table from "./table";

class Teachers extends Component {
  state = {
    teachers: [],
    cols: [
      { label: "ID", path: "tid" },
      { label: "Name", path: "name" },
      { label: "Branch", path: "branch" },
    ],
    sort: { column: "tid", order: "asc" },
  };
  async componentDidMount() {
    const teachers = await getTeachers({});
    this.setState({ teachers: teachers.data });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-5">
          <br />
          <h1 className="text-center">Teachers</h1>
          <br />
        </div>
        <Table
          rows={this.state.teachers}
          cols={this.state.cols}
          sort={this.state.sort}
        />
      </div>
    );
  }
}

export default Teachers;
