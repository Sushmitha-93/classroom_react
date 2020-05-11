import React, { Component } from "react";
import { getBranches } from "../../services/brancheService";
import { getTeachers } from "../../services/teachersService";
import AddClass from "./addClassForm";

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
                />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    className="form-control"
                    value={teacher.gender}
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
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <Input
                  id={"id"}
                  label={"ID"}
                  type={"text"}
                  placeholder={"Enter ID"}
                  value={teacher.tid}
                />
              </div>
              <div className="col">
                <Input
                  id={"phone"}
                  label={"Phone"}
                  type={"text"}
                  placeholder={"Enter Phone"}
                  value={teacher.phone}
                />
              </div>
            </div>
            <label>Classes</label>
            <table className="table table-sm table-bordered">
              <thead>
                <th>Branch</th>
                <th>Semester</th>
                <th>Subjects</th>
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

            <AddClass />
            <br />
            <br />
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                value={teacher.address}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TeacherForm;
