import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: false,
      text: "",
    },
  },
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const data = {
  labels: [],
  datasets: [
    {
      label: "Total Earnings",
      data: [],
      backgroundColor: [],
    },
  ],
};

const EarningsGraph = (props) => {
  const [, updateState] = useState({});

  useEffect(() => {
    const _users = [];
    const earningsData = [
      {
        label: "Total Earnings",
        data: [],
        backgroundColor: [],
      },
    ];

    for (const element of props.users) {
      _users.push(element.name);
      earningsData[0].data.push(element.earnings);
      if (parseFloat(element.earnings) > 0) {
        earningsData[0].backgroundColor.push("blue");
      } else {
        earningsData[0].backgroundColor.push("red");
      }
    }
    data.labels = _users;
    data.datasets = earningsData;
    updateState({});
  }, [props.users]);
  return <Bar options={options} data={data} type="bar" />;
};

export default EarningsGraph;
