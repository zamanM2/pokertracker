import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVJgDiBv030iFgFwONBkk1Y2y-n9sATcU",
  authDomain: "poker-tracker-d1394.firebaseapp.com",
  databaseURL: "https://poker-tracker-d1394-default-rtdb.firebaseio.com",
  projectId: "poker-tracker-d1394",
  storageBucket: "poker-tracker-d1394.appspot.com",
  messagingSenderId: "723679960897",
  appId: "1:723679960897:web:41902d770d8ccdb0af4bc0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const auth = getAuth(app);

export { dbRef, auth };
