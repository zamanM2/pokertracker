import { dbRef, storage } from "./FirebaseConfig";
import { child, get, push, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const getUsers = () => {
  return get(child(dbRef, `/users/`));
};

export const getGameSessions = () => {
  return get(child(dbRef, `/seasons/`));
};

export const getGameData = (season, date) => {
  return get(child(dbRef, `/seasons/${season}/${date}`));
};

export const getUserData = (userId) => {
  return get(child(dbRef, `/users/${userId}`));
};

export const getPrizePool = async () => {
  return get(child(dbRef, `/metadata/prizePool`));
};

export const getLatestSeasonNumber = async () => {
  return get(child(dbRef, `/metadata/currentSeason`));
};

export const addNewUser = async (newName) => {
  return push(child(dbRef, `/users/`), {
    buyBacks: 0,
    earnings: 0,
    gamesPlayed: 0,
    isActive: true,
    seasonEarnings: 0,
    seasonAllIns: 0,
    name: `${newName}`,
  });
};

export const endSeason = async (users) => {
  get(child(dbRef, `/metadata/currentSeason`)).then((snapshot) => {
    const currentSeason = snapshot.val();
    const newSeason = currentSeason + 1;
    const updateSeason = {};
    updateSeason[`/metadata/currentSeason`] = newSeason;
    update(dbRef, updateSeason);
  });
  const resetSeasonData = {};
  users.forEach((el) => {
    resetSeasonData[el.id] = {
      seasonEarnings: 0,
      buyBacks: el.buyBacks,
      earnings: el.earnings,
      name: el.name,
      isActive: el.isActive,
      gamesPlayed: el.gamesPlayed,
      seasonAllIns: 0,
    };
  });
  updatePrizePool(0);
  return update(child(dbRef, `/users/`), resetSeasonData);
};

export const updatePrizePool = (newPrizePool) => {
  const prizePool = {};
  prizePool[`/metadata/prizePool`] = newPrizePool;
  update(dbRef, prizePool);
};

export const addToPrizePool = async (amountToAdd) => {
  const currentPrizePool = await get(child(dbRef, `/metadata/prizePool`));
  const newPrizePool = {};
  newPrizePool[`/metadata/prizePool`] = currentPrizePool.val() + amountToAdd;
  update(dbRef, newPrizePool);
};

export const saveGameSession = async (date, usersInGame, dealer) => {
  await addToPrizePool(usersInGame.length);
  const sessionData = {};
  usersInGame.forEach((el) => {
    sessionData[el.id] = {
      buyBacks: el.inputBuyBacks,
      earnings: el.inputEarnings,
      name: el.name,
    };
  });

  sessionData["dealer"] = dealer;
  const updateSession = {};
  const season = await get(child(dbRef, `/metadata/currentSeason`));
  updateSession[`/seasons/${"season-" + season.val()}/${date}`] = sessionData;
  update(dbRef, updateSession);

  let updatesUsers = {};
  usersInGame.forEach((el) => {
    updatesUsers[el.id] = {
      name: el.name,
      gamesPlayed: el.gamesPlayed + 1,
      seasonGamesPlayed: el.seasonGamesPlayed + 1,
      earnings: el.earnings + parseFloat(el.inputEarnings),
      buyBacks: el.buyBacks + parseInt(el.inputBuyBacks),
      isActive: true,
      seasonEarnings: el.seasonEarnings + parseFloat(el.inputEarnings),
      seasonAllIns: el.seasonAllIns + parseInt(el.inputAllIns),
    };
  });
  return update(child(dbRef, `/users/`), updatesUsers);
};

export const getGameCaption = async (key) => {
  return get(child(dbRef, `/metadata/gameCaption/${key}`));
};

export const setGameCaption = async (key, caption) => {
  const gameCaption = {};
  gameCaption[`/metadata/gameCaption/${key}`] = caption;
  update(dbRef, gameCaption);
  return get(child(dbRef, `/metadata/gameCaption/${key}`));
};

export const getGameHistory = async () => {
  return get(child(dbRef, `/seasons/`));
};

export const getGameImage = async (date) => {
  const gameRef = ref(storage, `gameImages/${date}.jpg`);
  return getDownloadURL(gameRef);
};

export const uploadGameImage = async (date, file, setImage) => {
  const storageRef = ref(storage, `gameImages/${date}.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImage(downloadURL);
      });
    }
  );
};

export const saveSeasonStats = (stats, season) => {
  const data = {};
  data[`/seasonStats/season-${season}`] = Object.fromEntries(stats);
  return update(dbRef, data);
};
