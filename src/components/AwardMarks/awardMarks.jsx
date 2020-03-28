import React, { Component } from "react";
import _ from "lodash";

import { getTests, postTests } from "../../services/testService";

import Filter from "./filter";
import TestNames from "./testNames";
import TestSubjects from "./testSubjects";

class AwardMarks extends Component {
  state = {
    class: "",
    month: "",
    tests: [],
    testNames: [],
    testSelected: "",
    testSubjects: []
  };
  handleSubmit = async e => {
    e.preventDefault();
    const classNum = e.target.classInput.value;
    const month = e.target.monthSelect.value;

    const response = await getTests({
      class: classNum,
      month: month
    });
    const tests = response.data;
    // console.log(tests);
    const testNames = _.map(tests, "name");
    //console.log(testNames);

    this.setState({ tests, testNames, class: classNum, month });
  };

  handleTestSelect = testName => {
    this.setState({
      testSelected: testName,
      testSubjects: _.find(this.state.tests, { name: testName }).subjects
    });
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
      tests: getResponse.data,
      testNames: _.map(getResponse.data, "name")
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Award Marks</h1>
          </div>
          {/* Class and Month filter component */}
          <Filter handleSubmit={this.handleSubmit} />
          <br />
          <br />
          <div className="row">
            {/* List of Test names for class and month selected */}
            <div className="col-md-3">
              <TestNames
                testNames={this.state.testNames}
                onTestSelect={this.handleTestSelect}
                testSelected={this.state.testSelected}
                handleNewTestName={this.handleNewTestName}
              />
            </div>
            {/* List of Subjects in the Test selected */}
            <div className="col-md-4">
              <TestSubjects testSubjects={this.state.testSubjects} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AwardMarks;
