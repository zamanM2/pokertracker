import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";

const Games = () => {
  return (
    <Container>
      <Row className="float-start">
        <Col>
          <h2>Games</h2>
        </Col>
        <Col>
          <Button>
            <FaPlus />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
