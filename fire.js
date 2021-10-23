import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFCZV9TacPV_AqMdmoUa0285eXf62YGbw",
  authDomain: "todoapp-project-fe774.firebaseapp.com",
  projectId: "todoapp-project-fe774",
  storageBucket: "todoapp-project-fe774.appspot.com",
  messagingSenderId: "252182989656",
  appId: "1:252182989656:web:41d940d461d781fc27f32d",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// firebase.initializeApp(firebaseConfig);
// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();

// firebase auth
const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
const signOut = () => auth.signOut();

// export utils/collections/auth
export { db, auth, signIn, signUp, signOut };
