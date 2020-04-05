import React, { Component } from "react";
import _ from "lodash";

import { getTests, postTests, updateTest } from "../../services/testService";

import Filter from "./filter";
import TestNames from "./testNames";
import TestSubjects from "./testSubjects";
import MarksTable from "./marksTable";

class MarksSheet extends Component {
  state = {
    class: "",
    month: "",
    testsForMonth: [], //resonse. array of test objects
    testSelected: {}, // test object which is now selected {_id: ... ,name: Unit test 1, class:5a, ...}
    subjectSelected: ""
  };
  handleSubmit = async e => {
    e.preventDefault();
    const classNum = e.target.classInput.value;
    const month = e.target.monthSelect.value;

    const response = await getTests({
      class: classNum,
      month: month
    });
    const testsForMonth = response.data;
    // console.log(tests);
    //console.log(testNames);

    this.setState({ testsForMonth, class: classNum, month, testSelected: {} });
  };

  handleTestSelect = test => {
    this.setState({
      testSelected: test
    });
  };

  handleSubjectSelect = subject => {
    this.setState({ subjectSelected: subject });
  };

  handleNewTestName = async e => {
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
      class: this.state.class,
      month: this.state.month
    });
    console.log(postResponse);

    const getResponse = await getTests({
      class: this.state.class,
      month: this.state.month
    });
    this.setState({
      testsForMonth: getResponse.data
    });
  };

  handleNewSubject = async e => {
    e.preventDefault();
    const newSubName = e.target.newSubject.value;
    e.target.reset();

    let subjects = this.state.testSelected.subjects;
    subjects.push(newSubName);

    const putResponse = await updateTest(this.state.testSelected._id, {
      subjects: subjects
    });
    console.log(putResponse);

    const getResponse = await getTests({
      class: this.state.class,
      month: this.state.month
    });
    this.setState({
      testsForMonth: getResponse.data
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Marks Sheet</h1>
          </div>
          {/* Class and Month filter component */}
          {this.state.subjectSelected === "" && (
            <div>
              <Filter handleSubmit={this.handleSubmit} />
              <br />
              <br />
              <div className="row">
                {/* List of Test names for class and month selected */}
                <div className="col-md-3">
                  {this.state.class === "" || (
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
                      testSelected={this.state.testSelected}
                      handleNewSubject={this.handleNewSubject}
                      onSubSelect={this.handleSubjectSelect}
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

export default MarksSheet;
