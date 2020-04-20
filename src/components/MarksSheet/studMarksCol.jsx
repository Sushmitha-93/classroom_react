import React from "react";
import _ from "lodash";
import { saveStudTestMarks } from "../../services/studentServices";

const StudMarksCol = ({ student, testId, testName, subName }) => {
  let result;

  async function saveStudMarks(marks) {
    //console.log(e.currentTarget.value);

    console.log(marks);

    let saveResult = await saveStudTestMarks({
      studId: student._id,
      testId: testId,
      testName: testName,
      subName: subName,
      marks: marks,
    });
    console.log(saveResult);
  }

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
      onBlur={(e) => saveStudMarks(e.currentTarget.value)}
    />
  );
};

export default StudMarksCol;
