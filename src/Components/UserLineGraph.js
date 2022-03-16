import React, { useEffect, useState } from "react";
import { getUserData, getGameHistory } from "../Firebase/PokerApi";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Earnings",
    },
  },
};

const data = {
  labels: [],
  datasets: [
    {
      label: "Dates",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const UserLineGraph = (props) => {
  const [, updateState] = useState();
  let { id } = useParams();

  useEffect(() => {
    getGameHistory().then((snapshot) => {
      data.labels = [];
      const earningsData = [
        {
          label: "Earnings",
          data: [], //y-axis
          borderColor: "#4169E1",
          backgroundColor: "#4169E1",
        },
      ];
      const gamesData = snapshot.val();
      const _gameHistory = [];
      const dates = Object.keys(gamesData);
      let totalEarnings= 0;
      for (const date of dates) {
        const userIds = Object.keys(gamesData[date]);
        for (const userId of userIds) {
          if (userId === id) {
              totalEarnings += parseFloat(gamesData[date][userId].earnings);
            _gameHistory.push({
              earnings: totalEarnings,
              buyBacks: gamesData[date][userId].buyBacks,
              date: date,
            });
          }
        }
      }
      for(const game of _gameHistory ) {
          data.labels.push(game.date)
          earningsData[0].data.push(game.earnings)
      }
      data.datasets = earningsData;
    });
    updateState({});
  }, []);

  return (
    <Container>
      <Line options={options} data={data} type={"line"} />
    </Container>
  );
};

export default UserLineGraph;
