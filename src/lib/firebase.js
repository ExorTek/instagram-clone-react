import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//here i want to import the seed file
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyA_hH4pOOxPNKeMnkhzwmWhZVjWCUxpnpQ",
  authDomain: "instagram-clone-f3e8e.firebaseapp.com",
  projectId: "instagram-clone-f3e8e",
  storageBucket: "instagram-clone-f3e8e.appspot.com",
  messagingSenderId: "477518434818",
  appId: "1:477518434818:web:4208fee815a5bb16a78d1b",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here is where I want to call the seed file (only once)
// seedDatabase(firebase);
export { firebase, FieldValue };
