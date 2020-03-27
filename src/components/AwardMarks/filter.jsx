import React from "react";

const Filter = ({ handleSubmit }) => {
  const months = [
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
  ];
  return (
    <form className="form-inline" onSubmit={handleSubmit}>
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
        {months.map(m => (
          <option value={m}>{m}</option>
        ))}
      </select>
      &nbsp;
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default Filter;
