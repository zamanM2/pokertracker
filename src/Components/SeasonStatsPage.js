import React from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { MdConstruction } from "react-icons/md";
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
      <Row style={{ fontSize: 24, textAlign: "center", marginBottom: "20px" }}>
        <label>Coming Soon...</label>
      </Row>
      <Row>
        <MdConstruction size={150} />
      </Row>
    </Container>
  );
};

export default LegalPage;
