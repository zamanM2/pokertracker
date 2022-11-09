import React from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { FaWrench } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../css/blackBtn.css";
import { useNavigate } from "react-router-dom";

const LegalPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="parentContainer"
      style={{ fontFamily: "Comic Sans MS" }}
    >
      <Button
        className="blackBtn"
        style={{ marginTop: "5px", marginRight: "10px" }}
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
      </Button>
      Coming Soon...
      <Row>
        <FaWrench size={100} />
      </Row>
    </Container>
  );
};

export default LegalPage;
