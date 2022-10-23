import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCDK-ohTi9ehmtL-8_ObhQBrqxQB8K8v3g",
//   authDomain: "argo-poker.firebaseapp.com",
//   projectId: "argo-poker",
//   storageBucket: "argo-poker.appspot.com",
//   messagingSenderId: "438544242576",
//   appId: "1:438544242576:web:a23eac0726d7bf2d26c515",
// };

const firebaseConfig = {
  apiKey: "AIzaSyD2YuoUUJRFa23BSXtBJFWTs42vWo8IxAg",
  authDomain: "poker-testdb.firebaseapp.com",
  projectId: "poker-testdb",
  storageBucket: "poker-testdb.appspot.com",
  messagingSenderId: "366716803608",
  appId: "1:366716803608:web:7e5203292a04d8aab4816d",
  measurementId: "G-0MNSFB2X59",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const auth = getAuth(app);
const storage = getStorage();

export { dbRef, auth, storage };
