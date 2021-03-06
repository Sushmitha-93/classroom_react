import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const NavBar = () => {
  // Getting user form JWT in local storage. It is undefined if nothing is there.
  const user = getCurrentUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        ClassRoom
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/loginForm">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signupForm">
                  Sign Up
                </Link>
              </li>
            </React.Fragment>
          )}
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          )}
        </ul>
        <span className="navbar-text">{user && "Hello " + user.username}</span>
      </div>
    </nav>
  );
};

export default NavBar;
