import React, { Component } from "react";
import { getBranches } from "../../services/brancheService";
import { getTeachers, saveTeacher } from "../../services/teachersService";
import AddClass from "./addClassForm";
import * as yup from "yup";

import Input from "../FormComponents/input";

class TeacherForm extends Component {
  state = {
    branches: [],
    teacher: {
      // Initializing only those properties for form elements not to give error for value attribute
      name: "",
      branch: "",
      designation: "",
      tid: "",
      phone: "",
      address: "",
      gender: "",
      classes: [],
    },
    validationErrors: [],
  };

  schema = {
    name: yup.string().required("Name is required").label("Name"),
    branch: yup.string().required("Branch is required").label("Branch"),
    designation: yup
      .string()
      .required("Designation is required")
      .label("Designation"),
    gender: yup.string().required("Select Gender").label("Gender"),
    tid: yup.string().required("ID is required").label("ID"),
    phone: yup.string().required("Phone is required").label("Phone"),
    address: yup.string().required("Address is required").label("Address"),
  };

  async componentDidMount() {
    this.populateTeacher();
    const branches = await getBranches();
    this.setState({ branches: branches.data });
  }

  populateTeacher = async () => {
    const teacherId = this.props.match.params.id;
    if (teacherId === "new") return;

    const teacher = await getTeachers({ _id: teacherId });
    this.setState({ teacher: teacher.data[0] });
  };

  addClass = (newClass) => {
    console.log(" teacher form Add class: ", newClass); // called from addClass component to pass addClass form input (new class info)
    let teacher = this.state.teacher;
    teacher.classes.push(newClass);
    this.setState({ teacher });
  };

  handleChange = async (e) => {
    const { id, value } = e.currentTarget;
    let { validationErrors, teacher } = this.state;

    // Yup validation for that particular input
    const schema = yup.object().shape({ [id]: this.schema[id] }); // Creating schema for that input only
    await schema
      .validate({ [id]: value })
      .then(delete validationErrors[id])
      .catch((err) => {
        console.log(err);
        validationErrors = { [err.path]: err.message };
      });

    // set value got from field
    teacher[id] = value;
    this.setState({ teacher, validationErrors });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.teacher);

    // Yup valdiation for the whole form
    const schema = yup.object().shape(this.schema);
    await schema
      .validate(this.state.teacher, { abortEarly: false })
      .then(() => {
        console.log("then");
        saveTeacher(this.state.teacher).then(
          this.props.history.push("/teachers")
        );
      })
      .catch((err) => {
        console.log(err);
        let yupValidationErrors = {};
        err.inner.map((o) => (yupValidationErrors[o.path] = o.message));
        this.setState({ validationErrors: yupValidationErrors });
      });
  };

  render() {
    let teacher = this.state.teacher;
    return (
      <div className="row justify-content-center">
        <div className="col-md-7">
          <h1>
            {this.props.match.params.id === "new" ? "New " : ""}Teacher Form
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col">
                <Input
                  id={"name"}
                  label={"Name"}
                  type={"text"}
                  placeholder={"Enter name"}
                  value={teacher.name}
                  onChange={this.handleChange}
                  validationError={this.state.validationErrors["name"]}
                />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    className="form-control"
                    value={teacher.gender}
                    onChange={this.handleChange}
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
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <select
                    id="branch"
                    className="form-control"
                    value={teacher.branch}
                    onChange={this.handleChange}
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
              </div>
              <div className="col">
                <Input
                  id={"designation"}
                  label={"Designation"}
                  type={"text"}
                  placeholder={"Enter Designation"}
                  value={teacher.designation}
                  onChange={this.handleChange}
                  validationError={this.state.validationErrors["designation"]}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <Input
                  id={"tid"}
                  label={"ID"}
                  type={"text"}
                  placeholder={"Enter ID"}
                  value={teacher.tid}
                  onChange={this.handleChange}
                  validationError={this.state.validationErrors["tid"]}
                />
              </div>
              <div className="col">
                <Input
                  id={"phone"}
                  label={"Phone"}
                  type={"text"}
                  placeholder={"Enter Phone"}
                  value={teacher.phone}
                  onChange={this.handleChange}
                  validationError={this.state.validationErrors["phone"]}
                />
              </div>
            </div>
            <label>Classes</label>
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Subjects</th>
                </tr>
              </thead>
              <tbody>
                {teacher.classes.map((c) => (
                  <tr key={c.index}>
                    <td>{c.branch}</td>
                    <td>{c.sem + c.section}</td>
                    <td>{c.subName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <AddClass branches={this.state.branches} addClass={this.addClass} />
            <br />
            <br />
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                value={teacher.address}
                onChange={this.handleChange}
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

export default TeacherForm;
