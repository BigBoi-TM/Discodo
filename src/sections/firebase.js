import firebase from "firebase";
/*
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
*/

const firebaseConfig = {
  apiKey: "AIzaSyD0pYX2PcEQcv2zQNvCRf80IWUzNUGv5Ns",
  authDomain: "discodo-react.firebaseapp.com",
  databaseURL: "https://discodo-react-default-rtdb.firebaseio.com",
  projectId: "discodo-react",
  storageBucket: "discodo-react.appspot.com",
  messagingSenderId: "541343703283",
  appId: "1:541343703283:web:bc781d6882fc04a8e31786",
  measurementId: "G-CH79PL97K6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, database };
export default db;