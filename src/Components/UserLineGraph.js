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

  useEffect(() => {
    async function populateChartData() {
      await getGameHistory().then((snapshot) => {
        const dates = Object.keys(snapshot.val());
        data.labels = [];
        const earningsData = [
          {
            label: "Earnings",
            data: [], //y-axis
            borderColor: "#4169E1",
            backgroundColor: "#4169E1",
          },
        ];
      });
    }
    populateChartData()
    updateState({});
  }, []);

  return (
    <Container>
      <Line options={options} data={data} type={"line"} />
    </Container>
  );
};

export default UserLineGraph;
