import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AddNewGame = () => {
  return (
    <Container>
      <Row>
        <h1>Add New Game Session</h1>
      </Row>
      <Row>
        <h3>Players to Add </h3>
      </Row>
      <Row>
        <h3>Players in Game</h3>
      </Row>
    </Container>
  );
};

export default AddNewGame;
