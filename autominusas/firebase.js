// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzvb7NTCa5AG21iyjhPfUnIMyjtJEl9x4",
  authDomain: "fir-auth-b87bc.firebaseapp.com",
  projectId: "fir-auth-b87bc",
  storageBucket: "fir-auth-b87bc.appspot.com",
  messagingSenderId: "450042457530",
  appId: "1:450042457530:web:228ca45d8cd7e2abd2c183"
};
// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
export { auth, firebase };