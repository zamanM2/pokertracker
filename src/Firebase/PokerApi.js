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
  const updateSession = {};
  updateSession[`/games/${date}`] = sessionData;
  update(dbRef, updateSession);

  let updatesUsers = {};
  usersInGame.forEach((el) => {
    updatesUsers[el.id] = {
      name: el.name,
      gamesPlayed: el.gamesPlayed + 1,
      earnings: el.earnings + parseFloat(el.inputEarnings),
      buyBacks: el.buyBacks + parseInt(el.inputBuyBacks),
    };
    return update(child(dbRef, `/users/`), updatesUsers);
  });
};
