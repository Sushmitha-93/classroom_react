import React from "react";

const TestSubjects = ({ testSubjects }) => {
  return (
    <ul class="list-group list-group-flush">
      {testSubjects.map(sub => (
        <li class="list-group-item">{sub}</li>
      ))}
      <li class="list-group-item">+ Add Subject</li>
    </ul>
  );
};

export default TestSubjects;
