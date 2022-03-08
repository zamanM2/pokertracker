import React from "react";

const UserList = (props) => {
  return (
    <div>
      <h2>Players</h2>
      {props.users.map((element) => (
        <div>{element.name}</div>
      ))}
    </div>
  );
};

export default UserList;
