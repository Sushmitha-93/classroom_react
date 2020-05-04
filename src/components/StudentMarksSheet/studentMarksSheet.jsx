import React, { Component } from "react";
import { getStudent } from "../../services/studentServices";
import { getTests } from "../../services/testService";
import { getSyllabus } from "../../services/syllabusService";

class StudentMarksSheet extends Component {
  state = {
    student: {
      marksSheet: [],
    },
    testNames: [],
    subNames: [],
  };

  handleSubmit = async (studUSN) => {
    let response = await getStudent({ USN: studUSN });
    const student = response.data[0];

    response = await getSyllabus({
      branch: student.branch,
      sem: student.sem,
    });
    const subNames = response.data[0].subjects.map((s) => s.name);

    response = await getTests({
      branch: student.branch,
      sem: student.sem,
      section: student.section,
    });
    const testNames = response.data.map((t) => t.name);

    this.setState({ student, subNames, testNames });
  };

  render() {
    const { student, testNames, subNames } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <h1>Student Marks Sheet</h1>
          <form
            className="form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit(e.target.studUSNInput.value);
            }}
          >
            <label className="my-1 mr-3" htmlFor="classInput">
              Student USN
            </label>
            <input
              type="text"
              className="form-control col-md-2"
              id="studUSNInput"
              placeholder="Ex: 1JS12CS105"
            ></input>
          </form>

          <br />
          {this.state.testNames.length === 0 || (
            <div>
              <div className="card">
                <div className="card-body">
                  <strong>Name: </strong> {student.name}
                  &emsp;
                  <strong>Branch: </strong>
                  {student.branch} &emsp; <strong>Section: </strong>{" "}
                  {student.section}
                </div>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Subjects </th>
                    {testNames.map((test) => (
                      <th scope="col" key={test}>
                        {test}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {subNames.map((s) => (
                    <tr key={s}>
                      <th>{s}</th>
                      {testNames.map((t, index) => (
                        <td key={index}>
                          {student.marksSheet[index].testScores[s]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default StudentMarksSheet;
