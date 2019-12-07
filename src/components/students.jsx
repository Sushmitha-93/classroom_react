import React, { Component } from "react";
import { getStudents, deleteStudent } from "../services/studentServices";
import { Link } from "react-router-dom";
import _ from "lodash";

class Students extends Component {
  state = {
    students: [],
    pageSize: 10,
    currentPage: 1
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

  getPagedData = () => {
    const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
    const endIndex = startIndex + this.state.pageSize;
    return _.slice(this.state.students, startIndex, endIndex);
  };

  getPageRange = () => {
    const pageCount = Math.ceil(
      this.state.students.length / this.state.pageSize
    );
    return _.range(1, pageCount + 1);
  };

  render() {
    const students = this.getPagedData();
    const pageRange = this.getPageRange();
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
                      onClick={() => this.handleDelete(student)}
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

          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  onClick={() =>
                    this.handlePageChange(
                      currentPage > 1 ? currentPage - 1 : currentPage
                    )
                  }
                >
                  Previous
                </a>
              </li>

              {pageRange.map(page => (
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    onClick={() => this.handlePageChange(page)}
                  >
                    {page}
                  </a>
                </li>
              ))}
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  onClick={() =>
                    this.handlePageChange(
                      currentPage != pageRange.length
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
