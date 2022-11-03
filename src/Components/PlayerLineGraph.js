import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/utils";

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
import Container from "react-bootstrap/Container";
import { getLatestSeasonNumber, getUsers } from "../Firebase/PokerApi";

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
    datalabels: {
      display: true,
      color: "black",
      align: "end",
      font: { size: 8 },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
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

const PlayerLineGraph = (props) => {
  const [, updateState] = useState();
  const [latestSeason, setLatestSeason] = useState(0);

  useEffect(() => {
    data.labels = [];
    const earningsData = [
      {
        label: "Total Earnings over Time",
        data: [], //y-axis
        borderColor: "#4169E1",
        backgroundColor: "#4169E1",
      },
    ];
    const _gameHistory = [];
    let totalEarnings = 0;
    for (let i = 0; i < props.gameHistory.length; i++) {
      if (props.isSeasonSelected) {
        if (props.gameHistory[i].season !== latestSeason) continue;
      }
      totalEarnings += parseFloat(props.gameHistory[i].earnings);
      _gameHistory.push({
        earnings: totalEarnings,
        buyBacks: props.gameHistory[i].buyBacks,
        date: formatDate(props.gameHistory[i].date),
      });
    }
    for (const game of _gameHistory) {
      data.labels.push(game.date);
      earningsData[0].data.push(Math.floor(game.earnings));
    }
    data.datasets = earningsData;
    updateState({});
  }, [props.gameHistory, props.isSeasonSelected]);

  useEffect(() => {
    getLatestSeasonNumber().then((snapshot) => {
      setLatestSeason(snapshot.val());
    });
  }, []);

  return (
    <Container>
      <Line options={options} data={data} type={"line"} />
    </Container>
  );
};

export default PlayerLineGraph;
