import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//here i want to import the seed file
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here is where I want to call the seed file (only once)
// seedDatabase(firebase);
export { firebase, FieldValue };
