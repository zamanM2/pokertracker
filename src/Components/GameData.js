import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getGameData, getGameImage } from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { formatDate, earningsCompare } from "../utils/utils";

const GameData = () => {
  const [gameData, setGameData] = useState([]);
  const [gameImage, setGameImage] = useState("");
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

  return (
    <Container>
      <h2 style={{ marginBottom: "5px" }}>Date: {formatDate(date)}</h2>
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
        style={{ width: "100%", height: "100%", marginBottom: "10px" }}
        src={gameImage}
        alt="Girl in a jacket"
      />
      <Button onClick={() => navigate("/")}>
        <IoMdArrowBack />
      </Button>
    </Container>
  );
};

export default GameData;
