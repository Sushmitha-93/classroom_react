import React, { Component } from "react";
import { getTests } from "../../services/testService";
import _ from "lodash";

import Filter from "./filter";
import TestNames from "./testNames";
import TestSubjects from "./testSubjects";

class AwardMarks extends Component {
  state = {
    tests: [],
    testNames: [],
    testSelected: "",
    testSubjects: []
  };
  handleSubmit = async e => {
    e.preventDefault();
    console.log(e.target.classInput.value);
    console.log(e.target.monthSelect.value);

    const response = await getTests({
      class: e.target.classInput.value,
      month: e.target.monthSelect.value
    });
    const tests = response.data;
    // console.log(tests);
    this.setState({ tests });

    const testNames = _.map(this.state.tests, "name");
    //console.log(testNames);
    this.setState({ testNames });
  };

  handleTestSelect = testName => {
    this.setState({
      testSelected: testName,
      testSubjects: _.find(this.state.tests, { name: testName }).subjects
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Award Marks</h1>
          </div>
          {/* Class and Month filter */}
          <Filter handleSubmit={this.handleSubmit} />
          <br />
          <br />
          <div className="row">
            <div className="col-md-3">
              <TestNames
                testNames={this.state.testNames}
                onTestSelect={this.handleTestSelect}
                testSelected={this.state.testSelected}
              />
            </div>
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
