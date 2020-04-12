import React, { Component } from "react";
import { getStudents } from "../../services/studentServices";
import Table from "../table";

class MarksTable extends Component {
  state = {
    cols: [
      { label: "Roll", path: "rollno" },
      { label: "Name", path: "name" },
      { label: `Marks / ${this.props.testSelected.maxMarks}`, path: "marks" },
    ],
    sort: { column: "rollno", order: "asc" },
    students: [],
  };
  async componentDidMount() {
    const response = await getStudents(
      `?class=${this.props.testSelected.class}`
    ); // get students in that class
    this.setState({ students: response.data });
  }

  render() {
    const { testSelected, subjectSelected } = this.props;

    return (
      <React.Fragment>
        <h4>
          {testSelected.class} - {testSelected.name} ({testSelected.month}) -
          {subjectSelected}
        </h4>
        <br />
        <Table
          rows={this.state.students}
          cols={this.state.cols}
          sort={this.state.sort}
          subName={subjectSelected}
          testId={testSelected._id}
        />
      </React.Fragment>
    );
  }
}

export default MarksTable;
