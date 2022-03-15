import { dbRef, storage } from "./FirebaseConfig";
import { child, get, push, update } from "firebase/database";
import { ref, getDownloadURL } from "firebase/storage";

export const getUsers = () => {
  return get(child(dbRef, `/users/`));
};

export const getGameSessions = () => {
  return get(child(dbRef, `/games/`));
};

export const getGameData = (date) => {
  return get(child(dbRef, `/games/${date}`));
};

export const getUserData = (userId) => {
  return get(child(dbRef, `/users/${userId}`));
};

export const addNewUser = async (newName) => {
  return push(child(dbRef, `/users/`), {
    buyBacks: 0,
    earnings: 0,
    gamesPlayed: 0,
    name: `${newName}`,
  });
};

export const saveGameSession = async (date, usersInGame) => {
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

export const getGameImage = async (date) => {
  const gameRef = ref(storage, `gameImages/${date}.jpg`);
  return getDownloadURL(gameRef);
};
