import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove, update } from "firebase/database";

export const getUsers = () => {
  return get(child(dbRef, `/users/`));
};

export const saveGameSession = (date, usersInGame) => {
  const sessionData = {};
  usersInGame.forEach((el) => {
    sessionData[el.id] = {
      buyBacks: el.inputBuyBacks,
      earnings: el.inputEarnings,
      name: el.name,
    };
  });
  const updates = {};
  updates[`/games/${date}`] = sessionData;
  update(dbRef, updates);

  usersInGame.forEach((el) => {});

  const updates2 = {
    111: {
      name: usersInGame[0].name,
      gamesPlayed: usersInGame[0].gamesPlayed + 1,
      earnings:
        usersInGame[0].earnings + parseFloat(usersInGame[0].inputEarnings),
      buyBacks:
        usersInGame[0].buyBacks + parseInt(usersInGame[0].inputBuyBacks),
    },
  };
  return update(child(dbRef, `/users/`), updates2);
  // usersInGame.forEach((el) => {
  //   const updates2 = { game };
  //   return update(child(dbRef, `/users/111`), updates2);
  // });
};
