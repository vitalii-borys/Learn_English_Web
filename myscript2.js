import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

// Initialize Firebase App
const myApp = initializeApp(firebaseConfig);
const auth = getAuth(myApp);

// Create container
const container = document.createElement('div');
container.className = 'container';

// Create auth status element
const authStatus = document.createElement('div');
authStatus.id = 'authStatus';
authStatus.className = 'auth-status hidden';

// Create login form
const loginForm = document.createElement('div');
loginForm.id = 'loginForm';
loginForm.className = 'hidden';

// Login form title
const loginTitle = document.createElement('h2');
loginTitle.textContent = 'Login';
loginForm.appendChild(loginTitle);

// Login form email input
const loginEmailGroup = document.createElement('div');
loginEmailGroup.className = 'form-group';
const loginEmailLabel = document.createElement('label');
loginEmailLabel.setAttribute('for', 'loginEmail');
loginEmailLabel.textContent = 'Email:';
const loginEmailInput = document.createElement('input');
loginEmailInput.type = 'email';
loginEmailInput.id = 'loginEmail';
loginEmailInput.required = true;
loginEmailGroup.appendChild(loginEmailLabel);
loginEmailGroup.appendChild(loginEmailInput);
loginForm.appendChild(loginEmailGroup);

// Login form password input
const loginPasswordGroup = document.createElement('div');
loginPasswordGroup.className = 'form-group';
const loginPasswordLabel = document.createElement('label');
loginPasswordLabel.setAttribute('for', 'loginPassword');
loginPasswordLabel.textContent = 'Password:';
const loginPasswordInput = document.createElement('input');
loginPasswordInput.type = 'password';
loginPasswordInput.id = 'loginPassword';
loginPasswordInput.required = true;
loginPasswordGroup.appendChild(loginPasswordLabel);
loginPasswordGroup.appendChild(loginPasswordInput);
loginForm.appendChild(loginPasswordGroup);

// Login button
const loginButton = document.createElement('button');
loginButton.textContent = 'Login';
loginButton.onclick = login;
loginForm.appendChild(loginButton);

// Create signup form
const signupForm = document.createElement('div');
signupForm.id = 'signupForm';
signupForm.className = 'hidden';

// Signup form title
const signupTitle = document.createElement('h2');
signupTitle.textContent = 'Sign Up';
signupForm.appendChild(signupTitle);

// Signup form email input
const signupEmailGroup = document.createElement('div');
signupEmailGroup.className = 'form-group';
const signupEmailLabel = document.createElement('label');
signupEmailLabel.setAttribute('for', 'signupEmail');
signupEmailLabel.textContent = 'Email:';
const signupEmailInput = document.createElement('input');
signupEmailInput.type = 'email';
signupEmailInput.id = 'signupEmail';
signupEmailInput.required = true;
signupEmailGroup.appendChild(signupEmailLabel);
signupEmailGroup.appendChild(signupEmailInput);
signupForm.appendChild(signupEmailGroup);

// Signup form password input
const signupPasswordGroup = document.createElement('div');
signupPasswordGroup.className = 'form-group';
const signupPasswordLabel = document.createElement('label');
signupPasswordLabel.setAttribute('for', 'signupPassword');
signupPasswordLabel.textContent = 'Password:';
const signupPasswordInput = document.createElement('input');
signupPasswordInput.type = 'password';
signupPasswordInput.id = 'signupPassword';
signupPasswordInput.required = true;
signupPasswordGroup.appendChild(signupPasswordLabel);
signupPasswordGroup.appendChild(signupPasswordInput);
signupForm.appendChild(signupPasswordGroup);

// Signup button
const signupButton = document.createElement('button');
signupButton.textContent = 'Sign Up';
signupButton.onclick = signup;
signupForm.appendChild(signupButton);

// Create logout button
const logoutButton = document.createElement('button');
logoutButton.id = 'logout';
logoutButton.className = 'hidden';
logoutButton.textContent = 'Logout';
logoutButton.onclick = logout;

// Append all elements to the container
container.appendChild(authStatus);
container.appendChild(loginForm);
container.appendChild(signupForm);
container.appendChild(logoutButton);

// Append the container to the body (or any other parent element)
document.body.appendChild(container);

// Handle auth state changes
onAuthStateChanged(auth, (user) => {
    const authStatus = document.getElementById('authStatus');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logout');

    // Remove hidden class from status first
    authStatus.classList.remove('hidden');

    if (user) {
        // User is signed in
        authStatus.textContent = `Logged in as: ${user.email}`;
        loginForm.classList.add('hidden');
        signupForm.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        // User is signed out
        authStatus.textContent = 'Not logged in';
        loginForm.classList.remove('hidden');
        signupForm.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
});

// Show message function
function showMessage(message, isError = false) {
    const container = document.querySelector('.container');
    const existingMessage = document.querySelector('.auth-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    container.appendChild(messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => messageDiv.remove(), 3000);
}

// Login function
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        showMessage('Successfully logged in!');
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Signup function
async function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        showMessage('Successfully signed up!');
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Logout function
async function logout() {
    try {
        await signOut(auth);
        showMessage('Successfully logged out!');
    } catch (error) {
        showMessage(error.message, true);
    }
}
