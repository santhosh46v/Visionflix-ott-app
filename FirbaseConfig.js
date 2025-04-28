import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, initializeAuth, getReactNativePersistence, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: ""
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const database = getDatabase(firebaseApp);

export { auth, database, ref, onValue, signInWithEmailAndPassword };
