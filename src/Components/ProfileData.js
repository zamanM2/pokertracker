import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import profileImg from "../images/Sakib.jpeg";
import { getUserData } from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ProfileData = () => {
  const [userData, setUserData] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // getUserData(data).then((snapshot) => {
    //   setUserData(snapshot.val());
    //   console.log(snapshot.val());
    // });
  }, []);

  return (
    <Container>
      <Row>
        <img src={profileImg} alt="Photo" />
      </Row>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Container>
  );
};

export default ProfileData;
