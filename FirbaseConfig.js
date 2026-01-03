import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, initializeAuth, getReactNativePersistence, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyAu5kUrANOjhhoTspvJy-LkKU4Xo-g2uH4",
  authDomain: "react-native-857df.firebaseapp.com",
  databaseURL: "https://react-native-857df-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-native-857df",
  storageBucket: "react-native-857df.appspot.com"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const database = getDatabase(firebaseApp);

export { auth, database, ref, onValue, signInWithEmailAndPassword };