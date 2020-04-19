import React from "react";

const Filter = ({ handleSubmit, branches }) => {
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
    "December",
  ];
  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <label className="my-1 mr-2" htmlFor="branchSelect">
        Branch
      </label>
      <select className="custom-select my-1 mr-sm-2" id="branchSelect">
        <option defaultValue value="">
          Choose...
        </option>
        {branches.map((b) => (
          <option key={b.code} value={b.name}>
            {b.code}
          </option>
        ))}
      </select>
      &nbsp; &nbsp; &nbsp;
      <label className="my-1 mr-3" htmlFor="semSelect">
        Sem
      </label>
      <select className="custom-select my-1 mr-sm-2" id="semSelect">
        <option defaultValue value="1">
          1
        </option>
        {[2, 3, 4, 5, 6, 7, 8].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      &nbsp; &nbsp; &nbsp;
      <label className="my-1 mr-3" htmlFor="sectionInput">
        Section
      </label>
      <input
        type="text"
        className="form-control"
        style={{ width: "50px" }}
        id="sectionInput"
      />
      &nbsp; &nbsp; &nbsp;
      <label className="my-1 mr-2" htmlFor="monthSelect">
        Month
      </label>
      <select className="custom-select my-1 mr-sm-2" id="monthSelect">
        <option defaultValue value="">
          Choose...
        </option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
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
