import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class LeftSideBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-header pl-3">
          <h3>LeftSidebar component</h3>
        </div>

        <div className="list-group-flush">
          <Link to="/" className="list-group-item list-group-item-action">
            Home
          </Link>
          <NavLink
            to="/students"
            className="list-group-item list-group-item-action"
          >
            Students
          </NavLink>
          <NavLink
            to="/teachers"
            className="list-group-item list-group-item-action"
          >
            Teachers
          </NavLink>
          <NavLink
            to="/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <a className="list-group-item list-group-item-action">Exams / Test</a>
          <div className="submenu pl-3">
            <NavLink
              to="/awardMarks"
              className="list-group-item list-group-item-action"
            >
              Fill Marks
            </NavLink>
            <NavLink
              to="/studentMarksSheet"
              className="list-group-item list-group-item-action"
            >
              Student Marks Sheet
            </NavLink>
          </div>

          <NavLink
            to="/assignments"
            className="list-group-item list-group-item-action"
          >
            Assignments
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftSideBar;
