// Firebase configuration - replace with your config
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Word pairs (Ukrainian - English)
const wordPairs = [
    { ukr: 'слово', eng: 'word' },
    { ukr: 'кіт', eng: 'cat' },
    // Add more word pairs here
];

let currentPair;
let missingLetterIndex;
let correctLetter;

// Monitor Auth State
auth.onAuthStateChanged((user) => {
    if (user) {
        showPage('gamePage');
        document.getElementById('userEmail').textContent = user.email;
        setupNewWord();
    } else {
        showPage('loginPage');
    }
});

// Authentication Functions
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        alert(error.message);
    }
}

async function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        alert(error.message);
    }
}

async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        alert(error.message);
    }
}

// Game Functions
function setupNewWord() {
    // Pick random word pair
    currentPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    
    // Pick random letter to hide
    missingLetterIndex = Math.floor(Math.random() * currentPair.eng.length);
    correctLetter = currentPair.eng[missingLetterIndex];

    // Display Ukrainian word
    document.getElementById('ukrainianWord').textContent = currentPair.ukr;

    // Display English word with missing letter
    document.getElementById('engWordStart').textContent = currentPair.eng.slice(0, missingLetterIndex);
    document.getElementById('engWordEnd').textContent = currentPair.eng.slice(missingLetterIndex + 1);
    
    // Clear input
    document.getElementById('letterInput').value = '';
}

async function checkAnswer() {
    const userInput = document.getElementById('letterInput').value.toLowerCase();
    
    if (userInput === correctLetter) {
        // Save to Firestore
        try {
            await db.collection('correct_answers').add({
                userId: auth.currentUser.uid,
                word: currentPair.eng,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert('Correct! Word saved.');
            setupNewWord();
        } catch (error) {
            alert('Error saving word: ' + error.message);
        }
    } else {
        alert('Try again!');
    }
}

// UI Helper Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.auth-page, .game-page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show requested page
    document.getElementById(pageId).classList.remove('hidden');
}