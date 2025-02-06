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
    input.style.display = 'block';
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
        return;
    } else if (!email.includes('@')) {
        statusMessage.textContent = 'Email should contain @';
        return;
    } else if (password.length < 6) {
        statusMessage.textContent = 'Password should be at least 6 characters long';
        return;
    } 
    statusMessage.textContent = 'Signing in...';
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in: " + user);
        pageStatus = 'signed in';
        statusMessage.textContent = "Signed in successfully! Page status: " + pageStatus;
    } catch (error) {
        //console.error("An error occurred while signing in:", error); // Log the full error!
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
            statusMessage.textContent = "Invalid email or password. Please try again.";
        } else if (errorCode === "auth/user-not-found") {
            statusMessage.textContent = "User not found. Please check your email or sign up.";
        } else if (errorCode === "auth/wrong-password") {
            statusMessage.textContent = "Incorrect password. Please try again.";
        } else if (errorCode === "auth/too-many-requests") {
            statusMessage.textContent = "Too many attempts. Please try again later."; // Handle rate limiting
        } else if (errorCode === "auth/email-already-in-use") {
            statusMessage.textContent = "Email is already in use. Please sign in or use a different email.";
        } else {
            statusMessage.textContent = "An error occurred during login. Please try again later."; // Generic error message
        }

    }
    // Clear password field for better UX (optional):
    document.getElementById('email').focus();
    document.getElementById('email').value = '';
    setTimeout(() => {                       // Use setTimeout for UI update
        document.getElementById('email').style.display = 'none'; // Then hide
    }, 0);
    document.getElementById('password').focus();
    document.getElementById('password').value = '';
    setTimeout(() => { 
    document.getElementById('password').display = 'none';
    }, 0);
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
            console.log("Credentials seems to be wrong. Can you check again, please?");
        }
    }
}

async function logOut() {
    try {
        await signOut(auth);
        pageStatus = 'signed out';
        statusMessage.textContent = 'User signed out. Page status: ' + pageStatus;
    } catch (error) {
        console.log("An error occurred while signing out");
    }
    setTimeout(() => { 
    document.getElementById('email').display = 'block';
    }, 0);
    setTimeout(() => { 
    document.getElementById('password').display = 'block';
    }, 0);
}

const signInButton = document.getElementById('sign-in');
signInButton.addEventListener('click', async () => {
    console.log('Sign in button clicked');
    try {
        await signIn();
    } catch (error) {
        console.log("An error occurred while signing in. Hello from button.");
    }
});

const signUpButton = document.getElementById('sign-up');
signUpButton.addEventListener('click', async () => {
    console.log('Sign up button clicked');
    try {
        await signUp();
    } catch (error) {
        console.log("An error occurred while signing up. Hello from button.");
    }
});

const logOutButton = document.getElementById('log-out');
logOutButton.style.display = 'none';
logOutButton.addEventListener('click', async () => {
    console.log('Log out button clicked');
    try {
        await logOut();
    } catch (error) {
        console.log("An error occurred while loging out. Hello from button.");
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in');
        pageStatus = 'signed in';
        statusMessage.textContent = 'User '  + user.email + ' is signed in.';
        logOutButton.style.display = 'block';

        // Show email, password, and buttons
        setTimeout(() => {
        document.getElementById('email').style.display = 'none';
        }, 0);
        setTimeout(() => {
        document.getElementById('password').style.display = 'none';
        }, 0);
        setTimeout(() => {
        document.getElementById('sign-in').style.display = 'none';
        }, 0);
        setTimeout(() => {
        document.getElementById('sign-up').style.display = 'none';
    }, 0);
    } else {
        console.log('User is signed out');
        pageStatus = 'signed out';
        statusMessage.textContent = 'User is signed out.';
        logOutButton.style.display = 'none';
        // Show email, password, and buttons
        document.getElementById('email').style.display = 'block';
        document.getElementById('password').style.display = 'block';
        document.getElementById('sign-in').style.display = 'block';
        document.getElementById('sign-up').style.display = 'block';
        document.getElementById('password').value = '';
        document.getElementById('email').value = '';
    }
})