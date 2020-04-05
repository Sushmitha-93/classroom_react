import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Students from "./components/students";
import StudentForm from "./components/studentForm";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import SignUp from "./components/signupForm";
import Logout from "./components/logout";
import LeftSideBar from "./components/sidebarOnLeft";
import RightSideBar from "./components/sidebarOnRight";
import Teachers from "./components/teachers";
import Profile from "./components/profile";
import MarksSheet from "./components/MarksSheet/marksSheet";

function App() {
  return (
    <React-Fragment>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 pl-0">
            <LeftSideBar />
          </div>
          <div className="col-8">
            <Switch>
              <Route path="/" exact component={Students} />
              <Route path="/students" component={Students} />
              <Route path="/teachers" component={Teachers} />
              <Route path="/profile" component={Profile} />
              <Route path="/studentForm/:id" component={StudentForm} />
              <Route path="/loginForm" component={LoginForm} />
              <Route path="/signupForm" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route path="/marksSheet" component={MarksSheet} />
            </Switch>
          </div>
          <div className="col-2">
            <RightSideBar />
          </div>
        </div>
      </div>
    </React-Fragment>
  );
}

export default App;
