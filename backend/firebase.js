import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsS-VIsWaqS682OZ68bgbX8TjCvZAkdhc",
  authDomain: "demo2leap2backend.firebaseapp.com",
  projectId: "demo2leap2backend",
  storageBucket: "demo2leap2backend.appspot.com",
  messagingSenderId: "190516809222",
  appId: "1:190516809222:web:0fcba88bdeac1f1e3bfd87",
  measurementId: "G-5CJEK23QTN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);