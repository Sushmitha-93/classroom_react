import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Students from "./components/students";
import StudentForm from "./components/studentForm";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import SignUp from "./components/signupForm";

function App() {
  return (
    <React-Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Students} />
        <Route path="/studentForm/:id" component={StudentForm} />
        <Route path="/loginForm" component={LoginForm} />
        <Route path="/signupForm" component={SignUp} />
      </Switch>
    </React-Fragment>
  );
}

export default App;
