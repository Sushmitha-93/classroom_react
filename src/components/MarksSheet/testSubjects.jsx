import React from "react";

const TestSubjects = ({
  testSelected,
  handleNewSubject,
  onSubSelect,
  subsForSem,
}) => {
  const subjects =
    Object.keys(testSelected).length === 0 ? [] : testSelected.subjects;

  return (
    <ul className="list-group list-group-flush">
      {subjects.map((sub) => (
        <li
          class="list-group-item list-group-item-action"
          onClick={() => onSubSelect(sub)}
        >
          {sub}
        </li>
      ))}
      <li className="list-group-item list-group-item-action">
        <form onSubmit={handleNewSubject}>
          <select
            className="form-control"
            id="newSubject"
            onChange={() => console.log("onchange select")}
          >
            <option defaultValue>+ Add New item</option>
            {subsForSem.map((sub) => (
              <option>{sub}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary mt-2 float-right">
            + Add
          </button>
        </form>
      </li>
    </ul>
  );
};

export default TestSubjects;
