import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  getGameData,
  getGameImage,
  uploadGameImage,
} from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { formatDate, earningsCompare } from "../utils/utils";
import "../css/blackBtn.css";

const GameData = () => {
  const [gameData, setGameData] = useState([]);
  const [gameImage, setGameImage] = useState("");
  const [imageToUpload, setImageToUpload] = useState("");
  let { date } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGameData(date).then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _gameData = [];
      for (const key of keys) {
        _gameData.push({ ...snapshot.val()[key] });
      }
      setGameData(_gameData);
    });
  }, []);

  useEffect(() => {
    async function getImage() {
      setGameImage(await getGameImage(date));
    }
    getImage();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageToUpload(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (imageToUpload === "") return;
    uploadGameImage(date, imageToUpload, setGameImage);
  };

  return (
    <Container>
      <Row>
        <Col xs={1}>
          <Button
            className="blackBtn"
            style={{ marginTop: "8px", marginBottom: "10px" }}
            onClick={() => navigate("/")}
          >
            <IoMdArrowBack />
          </Button>
        </Col>
        <Col xs={11}>
          <h2
            style={{
              marginBottom: "5px",
              marginTop: "7px",
              marginLeft: "20px",
            }}
          >
            Date: {formatDate(date)}
          </h2>
        </Col>
      </Row>
      <table className="table" style={{ textAlign: "center" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Player</th>
            <th scope="col">Earnings</th>
            <th scope="col">Buy Backs</th>
          </tr>
        </thead>
        <tbody>
          {gameData.sort(earningsCompare).map((player) => {
            return (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td style={{ color: player.earnings > 0 ? "green" : "red" }}>
                  {player.earnings}
                </td>
                <td>{player.buyBacks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <img
        style={{ width: "100%", height: "100%", marginBottom: "8px" }}
        src={gameImage}
        alt="Game Picture"
      />
      <Row style={{ marginBottom: "15px" }}>
        <Col xs={7}>
          <Form.Control type="file" onChange={handleChange} />
        </Col>
        <Col>
          <Button
            onClick={handleUpload}
            style={{ backgroundColor: "#A0A0A0", borderColor: "#A8A8A8" }}
          >
            Upload
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GameData;
