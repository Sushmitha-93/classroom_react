import React, { Component } from "react";
import Input from "./FormComponents/input";
import * as yup from "yup";
import { saveUser } from "../services/userServices";
import _ from "lodash";
import { setJwt } from "../services/authService";

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
    try {
      e.preventDefault();

      // 1. Create user object from values of form at the time of 'Submit'
      const user = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      };
      console.log("outside: creating user: ", user);

      // 2. Yup Validation (at browser level) to validate form input
      await this.schema.validate(user, { abortEarly: false }).catch(err => {
        //console.log(err.inner);
        const errobj = _.keyBy(
          _.map(err.inner, o => _.pick(o, ["path", "message"])),
          "path"
        );        
        console.log(errobj);

        this.setState({ validationErrors: errobj });
        // throwing error so that execution stops and next await wont get executed.
        throw new Error("signup form validation error");
      });

      // 3. Send request to save new user
      await saveUser(user)
        .then(res => {
          this.setState({ validationErrors: {} });
          // if you want to use any custom headers sent in response at client side, "access-control-expose-headers" should be set in response
          setJwt(res.headers["x-jwt"]);
          window.location = "/";
        })
        .catch(err => {
          console.log(err);
          let errObj;
          if (err.response.data.includes("email_1 dup key")) {
            errObj = {
              email: { path: "email", message: "Email ID already exists" }
            };
            this.setState({ validationErrors: errObj });
          }
        });
    } catch (e) {
      console.log("trycatch error:", e);
    }
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
                // if state property has nested object it will throw undefined error. But if its not a nested object, {username:"username required"}, it wont throw error
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
              type={"password"}
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
