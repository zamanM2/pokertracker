import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import AddNewPlayerModal from "./Modals/InputModal";
import Col from "react-bootstrap/Col";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { nameCompare } from "../utils/utils";
import "../css/blackBtn.css";

const PlayerList = (props) => {
  const [showNewPlayerModal, setNewPlayerModal] = useState(false);
  const { currentUser } = useAuth();

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
            {currentUser && (
              <Button
                className="blackBtn"
                onClick={addNewPlayerModalInfo.showModal}
              >
                <FaPlus />
              </Button>
            )}
          </h2>
        </Col>
      </Row>
      <Dropdown>
        <Row>
          <Row>
            {[...props.users].sort(nameCompare).map((element) => (
              <Link
                style={{ marginBottom: "3px", color: "black" }}
                key={element.id}
                to={`/profile/${element.name}/${element.id}`}
              >
                {element.name}
              </Link>
            ))}
          </Row>
        </Row>
      </Dropdown>
    </Container>
  );
};

export default PlayerList;
