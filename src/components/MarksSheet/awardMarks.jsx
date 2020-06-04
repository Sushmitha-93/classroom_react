import React, { Component } from "react";

import { getTests, postTests, updateTest } from "../../services/testService";
import { getBranches } from "../../services/brancheService";
import { getSyllabus } from "../../services/syllabusService";

import Filter from "./filter";
import TestNames from "./testNames";
import TestSubjects from "./testSubjects";
import MarksTable from "./marksTable";

class AwardMarks extends Component {
  state = {
    branch: "",
    sem: 0,
    section: "",
    month: "",
    testsForMonth: [], //response. array of test objects
    testSelected: {}, // test object which is now selected {_id: ... ,name: Unit test 1, class:5a, ...}
    subjectSelected: "",
    branches: [],
    subsForSem: [],
    newSubSubmitFlag: true,
  };

  componentDidMount = async () => {
    const branches = await getBranches();
    this.setState({ branches: branches.data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const branch = e.target.branchSelect.value;
    const sem = e.target.semSelect.value;
    const section = e.target.sectionInput.value;
    const month = e.target.monthSelect.value;

    const syllabus = await getSyllabus({
      branch: branch,
      sem: sem,
    });
    let subsForSem = syllabus.data[0].subjects.map((s) => s.name);
    console.log(syllabus.data);

    const response = await getTests({
      branch: branch,
      sem: sem,
      section: section,
      month: month,
    });
    const testsForMonth = response.data;
    console.log(testsForMonth);
    //console.log(testNames);

    this.setState({ testsForMonth, branch, sem, section, month, subsForSem });
  };

  handleTestSelect = (test) => {
    this.setState({
      testSelected: test,
    });
  };

  handleSubjectSelect = (subject) => {
    this.setState({ subjectSelected: subject });
  };

  handleNewSubListOnChange = () => {
    this.setState({ newSubSubmitFlag: false });
  };

  handleNewTestName = async (e) => {
    e.preventDefault();
    const name = e.target.newTest.value; // see below comment
    console.log("name: " + name);
    /*all the event's fields get nullified after the callback is done, 
    so you observe them as nulls in the asynchronous setState callback. That is because of React doing event pooling.
    Thats why you get null execption for e.target.reset after you await a call... 
    - Please copy your event data to a variable or call event.persist() to disable this behavior*/
    e.target.reset();

    const postResponse = await postTests({
      name: name,
      branch: this.state.branch,
      sem: this.state.sem,
      section: this.state.section,
      month: this.state.month,
    });
    console.log(postResponse);

    const getResponse = await getTests({
      branch: this.state.branch,
      sem: this.state.sem,
      section: this.state.section,
      month: this.state.month,
    });
    this.setState({
      testsForMonth: getResponse.data,
    });
  };

  handleNewSubject = async (e) => {
    e.preventDefault();
    const newSubName = e.target.newSubject.value;
    e.target.reset();

    let subjects = this.state.testSelected.subjects;
    subjects.push(newSubName);

    const putResponse = await updateTest(this.state.testSelected._id, {
      subjects: subjects,
    });
    console.log(putResponse);

    const getResponse = await getTests({
      branch: this.state.branch,
      sem: this.state.sem,
      section: this.state.section,
      month: this.state.month,
    });
    this.setState({
      testsForMonth: getResponse.data,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Award Marks</h1>
          </div>
          {/* Tests list filter component based on Branch,Sem,Section and month */}
          {this.state.subjectSelected === "" && (
            <div>
              <Filter
                handleSubmit={this.handleSubmit}
                branches={this.state.branches}
              />
              <br />
              <br />
              <div className="row">
                {/* List of Test names for class and month selected */}
                <div className="col-md-3">
                  {this.state.branch === "" || (
                    <TestNames
                      onTestSelect={this.handleTestSelect}
                      testSelected={this.state.testSelected}
                      handleNewTestName={this.handleNewTestName}
                      testsForMonth={this.state.testsForMonth}
                    />
                  )}
                </div>
                {/* List of Subjects in the Test selected */}
                <div className="col-md-4">
                  {this.state.testsForMonth.length === 0 || (
                    <TestSubjects
                      subsForSem={this.state.subsForSem}
                      testSelected={this.state.testSelected}
                      handleNewSubject={this.handleNewSubject}
                      onNewSubListSelect={this.handleNewSubListOnChange}
                      onSubSelect={this.handleSubjectSelect}
                      newSubSubmitFlag={this.state.newSubSubmitFlag}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {this.state.subjectSelected === "" || (
            <MarksTable
              testSelected={this.state.testSelected}
              subjectSelected={this.state.subjectSelected}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default AwardMarks;
