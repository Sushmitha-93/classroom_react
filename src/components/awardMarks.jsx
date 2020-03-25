import React, { Component } from "react";
import Input from "./FormComponents/input";

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

          <form className="form-inline" onSubmit={this.handleSubmit}>
            <label className="my-1 mr-3" htmlFor="classInput">
              Class
            </label>
            <input
              type="text"
              className="form-control col-md-1"
              id="classInput"
              placeholder="Ex: 5a"
            ></input>
            &nbsp; &nbsp; &nbsp;
            <label className="my-1 mr-2" htmlFor="monthSelect">
              Month
            </label>
            <select className="custom-select my-1 mr-sm-2" id="monthSelect">
              <option defaultValue>Choose...</option>
              {this.state.months.map(m => (
                <option value={m}>{m}</option>
              ))}
            </select>
            &nbsp;
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AwardMarks;
