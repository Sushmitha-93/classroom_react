import React, { Component } from "react";
import { saveStudent, getStudent } from "../services/studentServices";
import * as yup from "yup";
import Input from "./FormComponents/input";

class StudentForm extends Component {
  state = {
    data: {
      name: "",
      rollno: "",
      class: "",
      gender: "",
      phone: "",
      address: ""
    },
    responseError: "",
    validationErrors: {}
  };

  // Dont define schema as a Yup Schema. Because we will be doing that in handleChange(),
  // to create Yup schema object for each property. So, just define a plain object.
  schema = {
    name: yup
      .string()
      .required("Name is required")
      .label("Name"),
    rollno: yup
      .number()
      .typeError("Roll must be a number")
      .required()
      .label("Roll no."),
    class: yup
      .string("Class is required")
      .required()
      .label("Class"),
    gender: yup
      .string()
      .required()
      .label("Gender"),
    phone: yup
      .string()
      .required("Phone is required")
      .label("Phone"),
    address: yup
      .string()
      .required("Address is required")
      .label("Address")
  };

  componentDidMount() {
    this.populateStudent();
  }

  // Populate based on id in URL. If it is 'new' or 'student id'
  populateStudent = async () => {
    const studentId = this.props.match.params.id;
    if (studentId === "new") return;

    const { data: student } = await getStudent(studentId);
    console.log(student);
    this.setState({ data: student });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("Handle submit");
    console.log(this.state.data);
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
          responseError: "Roll no exists. Try different number"
        });
      else this.setState({ responseError: err.response.data });
    }
  };

  handleChange = async e => {
    const { id, value } = e.currentTarget;
    const { validationErrors } = this.state;
    // yup browser form validation
    const obj = { [id]: value };
    const schema = yup.object().shape({ [id]: this.schema[id] }); // creating yup schema for only that property

    await schema
      .validate(obj)
      .then(delete validationErrors[id])
      .catch(error => {
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
            <div className="form-row">
              <Input
                className={"form-group col"}
                id={"class"}
                label={"Class"}
                type={"text"}
                placeholder={"Enter class"}
                onChange={this.handleChange}
                value={this.state.data.class}
                validationError={this.state.validationErrors["class"]}
              />
              <Input
                className={"form-group col"}
                id={"rollno"}
                label={"Roll No."}
                type={"text"}
                placeholder={"Enter roll no."}
                onChange={this.handleChange}
                value={this.state.data.rollno}
                validationError={this.state.validationErrors["rollno"]}
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
