import React from "react";

const TestSubjects = ({ testSelected, handleNewSubject, onSubSelect }) => {
  const subjects =
    Object.keys(testSelected).length === 0 ? [] : testSelected.subjects;

  return (
    <ul className="list-group list-group-flush">
      {subjects.map(sub => (
        <li
          class="list-group-item list-group-item-action"
          onClick={() => onSubSelect(sub)}
        >
          {sub}
        </li>
      ))}
      <li className="list-group-item list-group-item-action">
        <form onSubmit={handleNewSubject}>
          <input
            id="newSubject"
            class="form-control"
            placeholder="+ Add New item"
          />
        </form>
      </li>
    </ul>
  );
};

export default TestSubjects;
