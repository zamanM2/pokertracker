import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove, update } from "firebase/database";

export const getUsers = () => {
  return get(child(dbRef, `/users/`));
};

export const saveGameSession = (date, data) => {
  const updates = {};
  updates[`/games/${date}`] = data;
  return update(dbRef, updates);
};
