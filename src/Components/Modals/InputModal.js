import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";

const InputModal = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal
      className="modalPop"
      show={props.info.visibility}
      onHide={props.info.hideModal}
    >
      <Modal.Header>
        <Modal.Title>{props.info.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>{props.info.body}</Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            value={inputValue}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.info.hideModal} variant="secondary">
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            props.info.okBtn(event, inputValue);
            props.info.hideModal();
            setInputValue("");
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InputModal;
