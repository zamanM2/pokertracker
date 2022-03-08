import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../Firebase/PokerApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      console.log(keys);
      const _users = [];
      for (const element of keys) {
        _users.push(snapshot.val()[element]);
      }
      setUsers(_users);
    });
  }, [users]);

  return (
    <div>
      <h2>Players</h2>
      {users.map((element) => (
        <div>{element.name}</div>
      ))}
    </div>
  );
};

export default UserList;
