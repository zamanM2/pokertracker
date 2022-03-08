import React, {useState,useEffect,} from 'react';
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
import { getUsers } from "../Firebase/PokerApi";


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
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
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
  labels : [],
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },

  ],
};



const EarningsGraph= ()=>{
    const [users, setUsers] = useState([]);
    useEffect(() => {
      async function fetchUserData() {
        await getUsers()
          .then((snapshot) => {
            const keys = Object.keys(snapshot.val());
            const _users = [];

            for (const element of keys) {
              _users.push(snapshot.val()[element].name);
            }
            data.labels = _users;
            setUsers(_users);
          })
          .catch(() => {});
      }
      fetchUserData();
    }, []);
    
    return <Bar options={options} data={data} />;
}

export default EarningsGraph;