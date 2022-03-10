import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDK-ohTi9ehmtL-8_ObhQBrqxQB8K8v3g",
  authDomain: "argo-poker.firebaseapp.com",
  projectId: "argo-poker",
  storageBucket: "argo-poker.appspot.com",
  messagingSenderId: "438544242576",
  appId: "1:438544242576:web:a23eac0726d7bf2d26c515",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const auth = getAuth(app);

export { dbRef, auth };
