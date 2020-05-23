import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getSyllabus } from "../../services/syllabusService";

const AddClass = ({ branches }) => {
  const [show, setShow] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [branch, setBranch] = useState();
  const [section, setSection] = useState();
  const [sem, setSem] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getSubjects(branch) {
    const subjects = await getSyllabus({ branch: branch });
    console.log(subjects);
  }

  function handleChange(e) {}

  return (
    <>
      <Button variant="secondary" size="small" onClick={handleShow}>
        + Add class
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign class to teacher</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Branch</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                {branches.map((b) => (
                  <option key={b._id}>{b.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="semester">
                <Form.Label>Semester</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s.index}>{s}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Class
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddClass;
