import React, { Component } from "react";
import { getBranches } from "../../services/brancheService";
import { getTeachers } from "../../services/teachersService";
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
    tid: yup.string().required("ID is required").label("ID"),
    phone: yup.number().required("Phone is required").label("Phone"),
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

  handleChange = async (e) => {
    const { id, value } = e.currentTarget;
    let teacher = this.state.teacher;

    teacher[id] = value;
    this.setState({ teacher });
  };

  render() {
    let teacher = this.state.teacher;
    return (
      <div className="row justify-content-center">
        <div className="col-md-7">
          <h1>
            {this.props.match.params.id === "new" ? "New " : ""}Teacher Form
          </h1>
          <form>
            <div className="form-row">
              <div className="col">
                <Input
                  id={"name"}
                  label={"Name"}
                  type={"text"}
                  placeholder={"Enter name"}
                  value={teacher.name}
                  onChange={this.handleChange}
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
                    <option defaultValue>Select</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
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
                </div>
              </div>
              <div className="col">
                <Input
                  id={"designation"}
                  label={"Designation"}
                  type={"text"}
                  placeholder={"Enter Designation"}
                  value={teacher.value}
                  onChange={this.handleChange}
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

            <AddClass branches={this.state.branches} />
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
          </form>
        </div>
      </div>
    );
  }
}

export default TeacherForm;
