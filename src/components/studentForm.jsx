import React, { Component } from "react";
import { saveStudent, getStudent } from "../services/studentServices";

class StudentForm extends Component {
  state = {
    data: {
      name: "",
      rollno: "",
      class: "",
      gender: "",
      phone: "",
      address: ""
    }
  };

  componentDidMount() {
    this.populateStudent();
  }

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

    const response = await saveStudent(this.state.data);
    this.props.history.push("/"); // takes to home page
    console.log(response);
  };

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1>
            {this.props.match.params.id === "new" ? "New" : ""} Student Form
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                onChange={this.handleChange}
                value={this.state.data.name}
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="class">Class</label>
                <input
                  type="text"
                  className="form-control"
                  id="class"
                  placeholder="Enter class"
                  onChange={this.handleChange}
                  value={this.state.data.class}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="rollno">Roll No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="rollno"
                  placeholder="Enter roll no."
                  onChange={this.handleChange}
                  value={this.state.data.rollno}
                />
              </div>
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
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter Phone"
                onChange={this.handleChange}
                value={this.state.data.phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                onChange={this.handleChange}
                value={this.state.data.address}
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
