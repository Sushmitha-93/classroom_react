import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import Pagination from "./pagination";

const ObjectId = require("mongodb").ObjectID;

class Table extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    sort: this.props.sort,
    search: { path: "", value: "" },
  };

  raiseSort = (col) => {
    const { sort } = this.state;
    if (col === sort.column) sort.order = sort.order === "asc" ? "desc" : "asc";
    else {
      sort.column = col;
      sort.order = "asc";
    }
    this.handleSort(sort);
  };

  renderSortIcon = (col) => {
    const { sort } = this.state;
    if (col === sort.column)
      if (sort.order === "asc") return <i className="fas fa-sort-up" />;
      else return <i className="fas fa-sort-down" />;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sort) => {
    this.setState({ sort });
  };

  handleSearch = (search) => {
    this.setState({ search });
  };

  getPageData = () => {
    const { sort, search } = this.state;
    const { rows } = this.props;

    //FILTER / SEARCH by Search value
    let filteredStudents;
    if (search.value !== "")
      filteredStudents = rows.filter(
        (stud) =>
          stud[search.path]
            .toString()
            .toLowerCase()
            .search(search.value.toLowerCase()) >= 0
      );
    else filteredStudents = rows;

    //SORT
    const sortedStudents = _.orderBy(
      filteredStudents,
      [sort.column],
      [sort.order]
    );

    // PAGINATE
    const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
    const endIndex = startIndex + this.state.pageSize;

    // Finally returns data(Array of student objects) for that page that are sorted, filtered on search
    return _.slice(sortedStudents, startIndex, endIndex);
  };

  render() {
    const { cols, subName, testId } = this.props;
    const rows = this.getPageData();
    let result;
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              {cols.map((col) => (
                <th
                  style={{ cursor: "pointer" }}
                  data-toggle="tooltip"
                  title="sort"
                  className="clickable"
                  key={col.path}
                  onClick={() => this.raiseSort(col.path)}
                >
                  {col.label}&nbsp;
                  {this.renderSortIcon(col.path)}
                </th>
              ))}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {cols.map((col) => (
                <td key={col.path}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    onChange={(e) =>
                      this.handleSearch({
                        path: col.path,
                        value: e.currentTarget.value,
                      })
                    }
                  />
                </td>
              ))}
              <td></td>
              <td></td>
            </tr>
            {rows.map((row) => (
              <tr key={row._id}>
                {/* <td>{row.rollno}</td>
              <td>{row.name}</td>
              <td>{row.class}</td> */}
                {cols.map((c) => (
                  <td>
                    {typeof row[c.path] === "undefined" ? (
                      <input
                        className="form-control"
                        type="text"
                        placeholder={
                          console.log(row.marksSheet + "\n" + row.testId) ||
                          row.marksSheet.length === 0 ||
                          ((result = _.find(row.marksSheet, {
                            testId: testId,
                          })) &&
                            typeof result === "undefined") ||
                          typeof result === "undefined" ||
                          (result = result.testScores[subName])
                        }
                      />
                    ) : (
                      row[c.path]
                    )}
                  </td>
                ))}
                {typeof this.props.rowEditLink === "undefined" || (
                  <div>
                    <td>
                      <button
                        type="button"
                        className="close"
                        data-toggle="tooltip"
                        title="Delete"
                        onClick={() => this.props.onDelete(row)}
                      >
                        &times;
                      </button>
                    </td>
                    <td>
                      <Link
                        to={this.props.rowEditLink + row._id}
                        data-toggle="tooltip"
                        title="Edit"
                      >
                        <i className="fas fa-user-edit"></i>
                      </Link>
                    </td>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={this.state.currentPage}
          totalRecordsCount={this.props.rows.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Table;
