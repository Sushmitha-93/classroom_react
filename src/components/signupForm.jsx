import React, { Component } from "react";
import Input from "./FormComponents/input";
import * as yup from "yup";
import { saveUser } from "../services/userServices";
import _ from "lodash";

class SignUp extends Component {
  state = {
    validationErrors: {}
  };

  schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .label("Username"),
    email: yup
      .string()
      .email()
      .required("Email is required")
      .label("Email"),
    password: yup
      .string()
      .required("Password is required")
      .label("Password")
  });

  handleSubmit = async e => {
    e.preventDefault();

    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    console.log(user);

    await this.schema
      .validate(user, { abortEarly: false })
      .then(async () => {
        const res = await saveUser(user);
        console.log(res);
      })
      .catch(err => {
        const errobj = _.keyBy(
          _.map(err.inner, o => _.pick(o, ["path", "message"])),
          "path"
        );
        //console.log(err.inner);
        console.log(errobj);
        //console.log(errobj.username.message);
        this.setState({ validationErrors: errobj });
        console.log(this.state.validationErrors);
      });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <br />
          <h1 className="text-center">Sign Up</h1>
          <br />
          <form onSubmit={this.handleSubmit}>
            <Input
              id={"username"}
              label={"Username"}
              type={"text"}
              placeholder={"Enter username"}
              validationError={
                this.state.validationErrors.username &&
                this.state.validationErrors.username.message
              }
            />
            <Input
              id={"email"}
              label={"Email"}
              type={"text"}
              placeholder={"Enter email"}
              validationError={
                this.state.validationErrors.email &&
                this.state.validationErrors.email.message
              }
            />
            <Input
              id={"password"}
              label={"Password"}
              type={"text"}
              placeholder={"Enter password"}
              validationError={
                this.state.validationErrors.password &&
                this.state.validationErrors.password.message
              }
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
