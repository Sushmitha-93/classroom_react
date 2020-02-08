import React, { Component } from "react";
import Input from "./FormComponents/input";
import { login, setJwt } from "../services/authService";
import * as yup from "yup";
import _ from "lodash";

class LoginForm extends Component {
  state = {
    validationErrors: {}
  };

  schema = yup.object().shape({
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

    // Creating user object from form inputs
    const user = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      // Validating form input using Yup
      await this.schema.validate(user, { abortEarly: false }).catch(err => {
        //console.log(err.inner);
        const errobj = _.keyBy(
          _.map(err.inner, o => _.pick(o, ["path", "message"])),
          "path"
        );
        //console.log(errobj);

        this.setState({ validationErrors: errobj });
        // throwing error so that execution stops and next await wont get executed.
        throw new Error("login form validation error");
      });

      // Sending login request to API
      await login(user)
        .then(res => {
          console.log("login response: ", res);
          this.setState({ validationErrors: {} });
          setJwt(res.data);
          window.location = "/";
        })
        .catch(err => {
          console.log(err.response);
          let errObj;
          if (err.response.data.includes("User does not exist")) {
            errObj = {
              email: { path: "email", message: err.response.data }
            };
            this.setState({ validationErrors: errObj });
          } else if (err.response.data.includes("Incorrect Password")) {
            errObj = {
              password: { path: "password", message: err.response.data }
            };
            this.setState({ validationErrors: errObj });
          }
        });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <br />
          <h1 className="text-center">Login Form</h1>
          <form onSubmit={this.handleSubmit}>
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

export default LoginForm;
