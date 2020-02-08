import React, { Component } from "react";
import { Link } from "react-router-dom";

class LeftSideBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-header pl-3">
          <h3>LeftSidebar component</h3>
        </div>

        <div className="list-group-flush">
          <Link
            to="/"
            className="list-group-item list-group-item-action active"
          >
            Home
          </Link>
          <Link
            to="/students"
            className="list-group-item list-group-item-action"
          >
            Students
          </Link>
          <Link
            to="/teachers"
            className="list-group-item list-group-item-action"
          >
            Teachers
          </Link>
          <Link
            to="/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </Link>
          <a className="list-group-item list-group-item-action">Time Table</a>
          <div className="submenu pl-3">
            <a href="#" className="list-group-item list-group-item-action">
              Class
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Exam / Tests
            </a>
          </div>
          <Link
            to="/assignments"
            className="list-group-item list-group-item-action"
          >
            Assignments
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftSideBar;
