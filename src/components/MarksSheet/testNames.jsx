import React from "react";

const TestNames = ({
  testsForMonth,
  testNames,
  onTestSelect,
  testSelected,
  handleNewTestName,
}) => {
  return (
    <ul className="list-group">
      {testsForMonth.map((test) => (
        <li
          className={
            test.name === testSelected.name
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onTestSelect(test)}
        >
          {test.name}
        </li>
      ))}
      <li className="list-group-item list-group-item-action">
        <form onSubmit={handleNewTestName}>
          <input
            className="form-control"
            placeholder="+ Add New item"
            id="newTest"
          />
        </form>
      </li>
    </ul>
  );
};

export default TestNames;
