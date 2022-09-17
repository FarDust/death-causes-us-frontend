// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAONkQs2Dd_-yqqV2wt-3RZyd6s--5ICgk",
  authDomain: "death-causes-362804.firebaseapp.com",
  projectId: "death-causes-362804",
  storageBucket: "death-causes-362804.appspot.com",
  messagingSenderId: "861340362965",
  appId: "1:861340362965:web:516407ed10b42ced80da5c",
  measurementId: "G-ZH7CLV5JHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the firebase app

export { app }