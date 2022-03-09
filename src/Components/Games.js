import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <Container>
      <Row className="float-start">
        <Col>
          <h2>
            Games
            <Link to="add-new-game">
              <Button>
                <FaPlus />
              </Button>
            </Link>
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
