import * as firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID,
  MESUREMENT_ID,
  STORAGE_BUCKET,
} from "@env";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  mesurementId: MESUREMENT_ID,
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export const db = Firebase.firestore();

export default Firebase;
