import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const AddClass = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Form.Control as="select" value="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="semester">
                <Form.Label>Semester</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" value="Choose...">
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
