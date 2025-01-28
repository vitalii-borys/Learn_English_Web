import { wordData } from "./wordData.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDoc, setDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

    // Initialize Firebase
    const firebaseConfig = {
  apiKey: "AIzaSyBr7wee4BXoi6rpKiQfi-beISDBdgmGMSw",
  authDomain: "learn-english-words-6604c.firebaseapp.com",
  databaseURL: "https://learn-english-words-6604c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-english-words-6604c",
  storageBucket: "learn-english-words-6604c.firebasestorage.app",
  messagingSenderId: "531312507967",
  appId: "1:531312507967:web:4554f2a5718d507b8c8c8a",
  measurementId: "G-0R5Q4LWVHL"
};

    app.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // DOM Elements
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signUpBtn = document.getElementById("sign-up-btn");
    const logInBtn = document.getElementById("log-in-btn");
    const logOutBtn = document.getElementById("log-out-btn");
    const statusText = document.getElementById("status");

    // Sign-Up Function
    signUpBtn.addEventListener("click", async () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        statusText.textContent = `Sign-up successful! Welcome, ${userCredential.user.email}`;
      } catch (error) {
        statusText.textContent = `Error: ${error.message}`;
      }
    });

    // Log-In Function
    logInBtn.addEventListener("click", async () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        statusText.textContent = `Logged in as: ${userCredential.user.email}`;
        toggleLogOutButton(true);
      } catch (error) {
        statusText.textContent = `Error: ${error.message}`;
      }
    });

    // Log-Out Function
    logOutBtn.addEventListener("click", async () => {
      try {
        await auth.signOut();
        statusText.textContent = "You have been logged out.";
        toggleLogOutButton(false);
      } catch (error) {
        statusText.textContent = `Error: ${error.message}`;
      }
    });

    // Toggle Log-Out Button
    function toggleLogOutButton(isLoggedIn) {
      logOutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    }

    // Monitor Auth State
    auth.onAuthStateChanged((user) => {
      if (user) {
        statusText.textContent = `Logged in as: ${user.email}`;
        toggleLogOutButton(true);
      } else {
        statusText.textContent = "No user logged in.";
        toggleLogOutButton(false);
      }
    });