import React, { Component } from "react";
import { getBranches } from "../../services/brancheService";
import { getTeachers } from "../../services/teachersService";

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
        <div className="col-md-5">
          <h1>
            {this.props.match.params.id === "new" ? "New " : ""}Teacher Form
          </h1>
          <form>
            <Input
              id={"name"}
              label={"Name"}
              type={"text"}
              placeholder={"Enter name"}
              value={teacher.name}
            />
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
            <div className="form-row">
              <div className="col">
                <Input
                  id={"designation"}
                  label={"Designation"}
                  type={"text"}
                  placeholder={"Enter Designation"}
                  value={teacher.value}
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
