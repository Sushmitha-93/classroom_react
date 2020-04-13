import React from "react";
import _ from "lodash";

const StudMarksCol = ({ student, testId, subName }) => {
  let result;
  return (
    <input
      className="form-control"
      type="text"
      placeholder={
        student.marksSheet.length === 0 ||
        ((result = _.find(student.marksSheet, {
          testId: testId,
        })) &&
          typeof result === "undefined") ||
        typeof result === "undefined" ||
        result.testScores[subName]
      }
    />
  );
};

export default StudMarksCol;
