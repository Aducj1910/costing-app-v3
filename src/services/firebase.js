import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwoE4qbqVNrG3F6MbFiWutjeNPpF7_li8",
  authDomain: "costing-4bcd5.firebaseapp.com",
  databaseURL: "https://costing-4bcd5.firebaseio.com",
  projectId: "costing-4bcd5",
  storageBucket: "costing-4bcd5.appspot.com",
  messagingSenderId: "619423731106",
  appId: "1:619423731106:web:6e42795016fc30099976fb",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
