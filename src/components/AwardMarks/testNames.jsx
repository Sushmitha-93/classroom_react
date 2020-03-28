import React from "react";

const TestNames = ({ testNames, onTestSelect, testSelected }) => {
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
      <li className="list-group-item list-group-item-action">+ Add New item</li>
    </ul>
  );
};

export default TestNames;
