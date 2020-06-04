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
import Teachers from "./components/Teacher/teachers";
import Profile from "./components/profile";
import AwardMarks from "./components/MarksSheet/awardMarks";
import StudentMarksSheet from "./components/StudentMarksSheet/studentMarksSheet";
import TeacherForm from "./components/Teacher/teacherForm";
import Home from "./components/home";

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
              <Route exact path="/" component={Home} />
              <Route path="/students" component={Students} />
              <Route path="/teachers" component={Teachers} />
              <Route path="/teacherForm/:id" component={TeacherForm} />
              <Route path="/profile" component={Profile} />
              <Route path="/studentForm/:id" component={StudentForm} />
              <Route path="/loginForm" component={LoginForm} />
              <Route path="/signupForm" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route
                exact
                path="/awardMarks"
                render={() => <AwardMarks key={Math.random()} />}
              />
              <Route path="/studentMarksSheet" component={StudentMarksSheet} />
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
