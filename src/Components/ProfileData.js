import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import profileImg from "../images/Sakib.jpeg";
import { getUserData } from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ProfileData = () => {
  const [userData, setUserData] = useState({});
  const [picture, setPicture] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(id).then((snapshot) => {
      setUserData(snapshot.val());
      // import(`../images/${snapshot.val().name}.jpeg`).then((image) => {
      //   setPicture(image)
      // });
    });
  }, []);

  useEffect(() => {}, [userData]);

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
