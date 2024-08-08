// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSvV6ActDc312pjP3gqMkOj4NFtJRxb2s",
  authDomain: "authuser-8227a.firebaseapp.com",
  databaseURL: "https://authuser-8227a-default-rtdb.firebaseio.com",
  projectId: "authuser-8227a",
  storageBucket: "authuser-8227a.appspot.com",
  messagingSenderId: "181086484616",
  appId: "1:181086484616:web:3c006a73b2270878b8c73d",
  measurementId: "G-5QEPXDLE86"
};

// const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();



async function testRealtimeDatabaseConnection() {
  try {
    const dbRef = ref(db, 'users')
    const snapshot = await get(dbRef)

    snapshot.exists() ? console.log("database is connected") : console.log("No data available");


  } catch (error) {
    console.error("Error connecting to Firestore:", error);
  }
}

testRealtimeDatabaseConnection();

// export default app;
export { auth, db, provider };
