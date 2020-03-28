import React from "react";

const TestSubjects = ({ testSubjects }) => {
  return (
    <ul class="list-group list-group-flush">
      {testSubjects.map(sub => (
        <li class="list-group-item list-group-item-action">{sub}</li>
      ))}
      <li class="list-group-item list-group-item-action">
        <input
          type="password"
          class="form-control"
          placeholder="+ Add New item"
        />
      </li>
    </ul>
  );
};

export default TestSubjects;
