import React from "react";

const TestNames = ({
  testNames,
  onTestSelect,
  testSelected,
  handleNewTestName
}) => {
  return (
    <ul className="list-group">
      {testNames.map(name => (
        <li
          className={
            name === testSelected
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onTestSelect(name)}
        >
          {name}
        </li>
      ))}
      <li className="list-group-item list-group-item-action">
        <form onSubmit={handleNewTestName}>
          <input
            class="form-control"
            placeholder="+ Add New item"
            id="newTest"
          />
        </form>
      </li>
    </ul>
  );
};

export default TestNames;
