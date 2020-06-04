import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getSyllabus } from "../../services/syllabusService";

const AddclassRooms = ({ branches, addClass }) => {
  const [show, setShow] = useState(false);
  let [classRoom, setclassRoom] = useState({
    branch: "",
    section: "",
    sem: "",
    subName: "",
  });
  let [subjects, setSubjects] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getSubjects(branch) {
    const response = await getSyllabus(branch);
    const subs = response.data[0].subjects.map((s) => s.name);
    setSubjects(subs);
  }
  useEffect(() => {
    console.log("inside useEffect");
    console.log("classRoom:", classRoom);
    if (classRoom.branch && classRoom.sem) {
      console.log("get branch");
      getSubjects({ branch: classRoom.branch, sem: classRoom.sem });
    }
  }, [classRoom.branch, classRoom.sem]);

  function handleChange(e) {
    const { value, id } = e.currentTarget;
    console.log(value);
    console.log(id);
    setclassRoom({ ...classRoom, [id]: value });
    console.log("classRoom.branch:", classRoom.branch); // won't have newly set value. Will reflect only after render. So use useEffect
    console.log("classRoom.sem:", classRoom.sem); // won't have newly set value. Will reflect only after render. So use useEffect
  }

  function handleSubmit() {
    console.log("Add class form submit");
    addClass(classRoom);
  }

  return (
    <>
      <Button variant="secondary" size="small" onClick={handleShow}>
        + Add classRooms
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign classRooms to teacher</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Branch</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(e) => handleChange(e)}
                id="branch"
              >
                <option>Choose...</option>
                {branches.map((b) => (
                  <option key={b._id}>{b.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="sem">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(e) => handleChange(e)}
                >
                  <option>Choose...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Section</Form.Label>
                <Form.Control
                  as="select"
                  controlId="section"
                  id="section"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Choose...</option>
                  <option>A</option>
                  <option>B</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(e) => handleChange(e)}
                id="subName"
              >
                <option>Choose...</option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            >
              Add classRooms
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddclassRooms;
