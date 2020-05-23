import React, { Component } from "react";
import { saveStudent, getStudent } from "../services/studentServices";
import { getBranches } from "../services/brancheService";
import * as yup from "yup";
import Input from "./FormComponents/input";

import _ from "lodash";

class StudentForm extends Component {
  state = {
    data: {
      name: "",
      branch: "",
      sem: "",
      section: "",
      USN: "",
      gender: "",
      phone: "",
      address: "",
    },
    responseError: "",
    validationErrors: {},
    branches: [],
  };

  // Dont define schema as a Yup Schema. Because we will be doing that in handleChange(),
  // to create Yup schema object for each property. So, just define a plain object.
  schema = {
    name: yup.string().required("Name is required").label("Name"),
    branch: yup.string().required("Select branch").label("Branch"),
    sem: yup.string().required("Select semester").label("Semester"),
    section: yup.string().required("Enter Section"),
    USN: yup.string().required("Enter USN").label("USN"),
    gender: yup.string().required().label("Gender"),
    phone: yup.string().required("Phone is required").label("Phone"),
    address: yup.string().required("Address is required").label("Address"),
  };

  async componentDidMount() {
    this.populateStudent();
    let branches = await getBranches();
    this.setState({ branches: branches.data });
  }

  // Populate based on id in URL. If it is 'new' or 'student id'
  populateStudent = async () => {
    const studentId = this.props.match.params.id;
    if (studentId === "new") return;

    const { data: student } = await getStudent({ _id: studentId });
    console.log(student);
    this.setState({ data: student[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit");
    console.log(this.state.data);
    // Yup validation
    const schema = yup.object().shape(this.schema);
    let yupValidationError;
    await schema
      .validate(this.state.data, { abortEarly: false })
      .catch((err) => {
        console.log(err);
        yupValidationError = _.zipObject(
          err.inner.map((o) => o.path),
          err.inner.map((o) => o.message)
        );
        this.setState({ validationErrors: yupValidationError });
      });
    console.log(yupValidationError);
    if (yupValidationError) return;

    try {
      // PUT request to node
      const response = await saveStudent(this.state.data); // will throw error if response is not 200 which will be caught in catch block

      this.props.history.push("/"); // takes to home page
      console.log(response);
    } catch (err) {
      // to handle 400 error when existing rollno is given by user
      console.log("Error response on Submit: ", err.response);
      if (err.response.data.includes("dup key"))
        this.setState({
          responseError: "USN exists",
        });
      else this.setState({ responseError: err.response.data });
    }
  };

  handleChange = async (e) => {
    const { id, value } = e.currentTarget;
    const { validationErrors } = this.state;
    // yup browser form validation
    const obj = { [id]: value };
    const schema = yup.object().shape({ [id]: this.schema[id] }); // creating yup schema for only that property

    await schema
      .validate(obj)
      .then(delete validationErrors[id])
      .catch((error) => {
        //console.log("yup validation result:", error);
        const errorMsg = error.errors[0]; // not doing set state here
        console.log("Yup validation error: ", errorMsg);
        validationErrors[id] = errorMsg;
      });

    // setting input field data
    const data = { ...this.state.data };
    data[id] = value;
    this.setState({ data });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1>
            {this.props.match.params.id === "new" ? "New" : ""} Student Form
          </h1>
          {this.state.responseError && (
            <div className="alert alert-danger">{this.state.responseError}</div>
          )}
          <form onSubmit={this.handleSubmit}>
            <Input
              id={"name"}
              label={"Name"}
              type={"text"}
              placeholder={"Enter name"}
              onChange={this.handleChange}
              value={this.state.data.name}
              validationError={this.state.validationErrors["name"]}
            />
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select
                className="form-control"
                id="branch"
                onChange={this.handleChange}
                value={this.state.data.branch}
              >
                <option defaultValue>Select Branch</option>
                {this.state.branches.map((b) => (
                  <option key={b._id}>{b.name}</option>
                ))}
              </select>
              {this.state.validationErrors["branch"] && (
                <div className="alert alert-danger">
                  {this.state.validationErrors["branch"]}
                </div>
              )}
            </div>
            <div className="form-row">
              <Input
                className={"form-group col"}
                id={"sem"}
                label={"Semester"}
                type={"text"}
                placeholder={"Enter Sem"}
                onChange={this.handleChange}
                value={this.state.data.sem}
                validationError={this.state.validationErrors["sem"]}
              />
              <Input
                className={"form-group col text-capitalize"}
                id={"section"}
                label={"Section"}
                type={"text"}
                placeholder={"Enter Section"}
                onChange={this.handleChange}
                value={this.state.data.section}
                validationError={this.state.validationErrors["section"]}
              />
              <Input
                className={"form-group col"}
                id={"USN"}
                label={"USN"}
                type={"text"}
                placeholder={"Enter USN"}
                onChange={this.handleChange}
                value={this.state.data.USN}
                validationError={this.state.validationErrors["USN"]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                onChange={this.handleChange}
                value={this.state.data.gender}
              >
                <option defaultValue>Select Gender</option>
                <option>Female</option>
                <option>Male</option>
              </select>
              {this.state.validationErrors["gender"] && (
                <div className="alert alert-danger">
                  {this.state.validationErrors["gender"]}
                </div>
              )}
            </div>
            <Input
              id={"phone"}
              label={"Phone"}
              type={"text"}
              placeholder={"Enter Phone"}
              onChange={this.handleChange}
              value={this.state.data.phone}
              validationError={this.state.validationErrors["phone"]}
            />
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                onChange={this.handleChange}
                value={this.state.data.address}
                //validationError={this.state.validationErrors["address"]}
              ></textarea>
              {this.state.validationErrors["address"] && (
                <div className="alert alert-danger">
                  {this.state.validationErrors["address"]}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default StudentForm;
