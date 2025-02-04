import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

const myApp = initializeApp(firebaseConfig);
const auth = getAuth(myApp);

let pageStatus = 'signed out';
function createAuthButton(buttonTextContent, buttonClassName, buttonId) {
    const signButton = document.createElement('button');
    signButton.textContent = buttonTextContent;
    signButton.className = buttonClassName;
    signButton.id = buttonId;
    document.body.appendChild(signButton);
}

function createInput(inputType, inputPlaceholder, inputId) {
    const input = document.createElement('input');
    input.type = inputType;
    input.placeholder = inputPlaceholder;
    input.id = inputId;
    document.body.appendChild(input);
}

createInput('email', 'Email', 'email');
createInput('password', 'Password', 'password');
createAuthButton('Sign in', 'sign-up', 'sign-in');
createAuthButton('Sign up', 'sign-in', 'sign-up');
createAuthButton('Log out', 'log-out', 'log-out');
let statusMessage = document.createElement('p');
statusMessage.textContent = pageStatus;
statusMessage.style.margin = '0';
document.body.appendChild(statusMessage);

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.trim() === '') {
        statusMessage.textContent = 'Email is required';
    } else if (!email.includes('@')) {
        statusMessage.textContent = 'Email should contain @';
    } else if (password.length < 6) {
        statusMessage.textContent = 'Password should be at least 6 characters long';
    } else {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            console.log('is user');
            pageStatus = 'signed in';
            statusMessage.textContent = "Signed in successfully! Page status: " + pageStatus;
        } catch (error) {
            console.log(error);
        }
    }
}

async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.trim() === '') {
        statusMessage.textContent = 'Email is required';
    } else if (!email.includes('@')) {
        statusMessage.textContent = 'Email should contain @';
    } else if (password.length < 6) {
        statusMessage.textContent = 'Password should be at least 6 characters long';
    } else {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            console.log('Signed up');
            pageStatus = 'signed in';
            statusMessage.textContent = pageStatus;
        } catch (error) {
            console.log(error);
        }
    }
}

async function logOut() {
    try {
        await signOut(auth);
        pageStatus = 'signed out';
        statusMessage.textContent = 'User signed out. Page status: ' + pageStatus;
    } catch (error) {
        console.log(error);
    }
}

const signInButton = document.getElementById('sign-in');
signInButton.addEventListener('click', async () => {
    console.log('Sign in button clicked');
    try {
        await signIn();
    } catch (error) {
        console.log(error);
    }
});

const signUpButton = document.getElementById('sign-up');
signUpButton.addEventListener('click', async () => {
    console.log('Sign up button clicked');
    try {
        await signUp();
    } catch (error) {
        console.log(error);
    }
});

const logOutButton = document.getElementById('log-out');
logOutButton.style.display = 'none';
logOutButton.addEventListener('click', async () => {
    console.log('Log out button clicked');
    try {
        await logOut();
    } catch (error) {
        console.log(error);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in');
        pageStatus = 'signed in';
        statusMessage.textContent = 'User '  + user.email + ' is signed in.';
        logOutButton.style.display = 'block';
    } else {
        console.log('User is signed out');
        pageStatus = 'signed out';
        statusMessage.textContent = 'User is signed out.';
        logOutButton.style.display = 'none';
    }
})