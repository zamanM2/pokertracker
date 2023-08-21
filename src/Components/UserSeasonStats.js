import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserSeasonStats = ({ player, place }) => {
  const medals = require.context("../images/medals", true);
  const headshots = require.context("../images/headshots", true);

  const getMedalImage = () => {
    try {
      return medals(`./${place}.png`);
    } catch (e) {
      return null;
    }
  };

  const getHeadshotImage = () => {
    try {
      return headshots(`./${player.name}.png`);
    } catch (e) {
      return null;
    }
  };

  return (
    <>
      <Row style={{ paddingTop: "15px" }}>
        <Col xs={6} style={{ textAlign: "right", padding: "0px" }}>
          <img src={getMedalImage()} alt={place} />
        </Col>
        <Col xs={6} style={{ textAlign: "left", padding: "0px" }}>
          <img
            src={getHeadshotImage()}
            alt="pic"
            style={{ borderRadius: "50%" }}
          />
        </Col>
      </Row>
      <Row style={{ textAlign: "center" }}>
        <label>
          <b>Name:</b> {player?.name}
        </label>
        <label>
          <b>Season Earnings:</b> {player?.seasonEarnings}
        </label>
        {player?.seasonAllIns !== undefined && (
          <label>
            <b>Season All-ins:</b> {player?.seasonAllIns}
          </label>
        )}
        <label>
          <b>Points:</b> {player?.points}
        </label>
        {player?.awards !== "" && (
          <label>
            <b>Awards:</b> {player?.awards}
          </label>
        )}
      </Row>
    </>
  );
};

export default UserSeasonStats;
