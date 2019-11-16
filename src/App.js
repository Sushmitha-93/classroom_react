import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Students from "./components/students";
import StudentForm from "./components/studentForm";

function App() {
  return (
    <React-Fragment>
      <Switch>
        <Route path="/" exact component={Students} />
        <Route path="/studentForm/:id" component={StudentForm} />
      </Switch>
    </React-Fragment>
  );
}

export default App;
