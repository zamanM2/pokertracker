import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getLatestSeasonNumber } from "../Firebase/PokerApi";

const SeasonStatsListPage = () => {
  const [latestSeason, setLatestSeason] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getLatestSeasonNumber().then((snapshot) => {
      setLatestSeason(snapshot.val());
    });
  }, []);

  return (
    <Container
      className="parentContainer"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <Button
        className="blackBtn"
        style={{ marginTop: "5px", marginRight: "10px" }}
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
      </Button>
      <Container style={{ textAlign: "center" }}>
        <h1>Season Stats</h1>
        {Array.from({ length: latestSeason }, (_, i) => i + 1).map(
          (seasonNum) => (
            <Row style={{ marginBottom: "10px" }}>
              <h5>
                <Link
                  style={{ color: "black" }}
                  key={seasonNum}
                  to={`/season-stats/${seasonNum}`}
                >
                  {`Season ${seasonNum}`}
                </Link>
              </h5>
            </Row>
          )
        )}
      </Container>
    </Container>
  );
};

export default SeasonStatsListPage;
