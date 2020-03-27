import React, { Component } from "react";
import Filter from "./filter";

class AwardMarks extends Component {
  state = {
    months: [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.classInput.value);
    console.log(e.target.monthSelect.value);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-3">
            <h1 className="ml-3">Award Marks</h1>
          </div>

          <Filter handleSubmit={this.handleSubmit} />
        </div>
      </React.Fragment>
    );
  }
}

export default AwardMarks;
