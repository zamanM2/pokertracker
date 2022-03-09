import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import AddNewPlayerModal from "./Modals/InputModal";
import Col from "react-bootstrap/Col";
import { FaPlus } from "react-icons/fa";

const UserList = (props) => {
  const [showNewPlayerModal, setNewPlayerModal] = useState(false);

  const handleAddNewPlayer = (event, newName) => {
    props.onAddNewUser(event, newName);
  };
  const addNewPlayerModalInfo = {
    title: "Add New Player",
    body: "New Name:",
    visibility: showNewPlayerModal,
    okBtn: handleAddNewPlayer,
    hideModal: () => {
      setNewPlayerModal(false);
    },
    showModal: () => {
      setNewPlayerModal(true);
    },
  };

  return (
    <Container>
      <AddNewPlayerModal info={addNewPlayerModalInfo} />
      <Row>
        <Col>
          <h2>
            Players
            <Button onClick={addNewPlayerModalInfo.showModal}>
              <FaPlus />
            </Button>
          </h2>
        </Col>
      </Row>
      <Row>
        <Row>
          {props.users.map((element) => (
            <Link key={element.id} to="/hello">
              {element.name}
            </Link>
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default UserList;
