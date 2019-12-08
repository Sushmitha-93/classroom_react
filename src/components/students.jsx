import React, { Component } from "react";
import { getStudents, deleteStudent } from "../services/studentServices";
import { Link } from "react-router-dom";
import _ from "lodash";
import StudentTable from "./studentTable";
import Pagination from "./pagination";

class Students extends Component {
  state = {
    students: [],
    pageSize: 10,
    currentPage: 1,
    sort: { column: "rollno", order: "asc" }
  };

  async componentDidMount() {
    // Do get request to Student API to get student info
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sort => {
    this.setState({ sort });
  };

  getPageData = () => {
    const { students, sort } = this.state;
    //SORT
    const sortedStudents = _.orderBy(students, [sort.column], [sort.order]);

    // PAGINATE
    const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
    const endIndex = startIndex + this.state.pageSize;
    return _.slice(sortedStudents, startIndex, endIndex);
  };

  render() {
    const students = this.getPageData();
    const { currentPage } = this.state;

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

          <StudentTable
            students={students}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sort={this.state.sort}
          />

          <Pagination
            currentPage={currentPage}
            totalRecordsCount={this.state.students.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
