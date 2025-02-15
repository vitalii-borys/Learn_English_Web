import { wordData } from "./wordData.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, getDoc, setDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, signOut, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries
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

createInput('text', 'Username', 'username');
createInput('email', 'Email', 'email');
createInput('password', 'Password', 'password');
createInput('password', 'Confirm password', 'confirmPassword');
createAuthButton('Sign in', 'sign-up', 'sign-in');
createAuthButton('Sign up', 'sign-in', 'sign-up');
createAuthButton('Log out', 'log-out', 'log-out');
createAuthButton('Create account', 'create-account', 'create-account');
createAuthButton('Back to sign in', 'sign-in', 'back-to-sign-in');

const signUpButton = document.getElementById('sign-up');
const signInButton = document.getElementById('sign-in');
const logOutButton = document.getElementById('log-out');
const backToSignInButton = document.getElementById('back-to-sign-in');
const createAccountButton = document.getElementById('create-account');
let username = document.getElementById('username');
let confirmPassword = document.getElementById('confirmPassword');

let statusMessage = document.createElement('p');
statusMessage.style.transition = 'opacity 6s';
setTimeout(() => {
    statusMessage.style.opacity = '0';
}, 2000);

signUpButton.style.display = 'none';
logOutButton.style.display = 'none';
username.style.display = 'none';
confirmPassword.style.display = 'none';

statusMessage.textContent = pageStatus;
statusMessage.id = 'statusMessage';
document.body.appendChild(statusMessage);

signInButton.addEventListener('click', async () => {
    console.log('Sign in button clicked');
    try {
        await signIn();
    } catch (error) {
        console.log("An error occurred while signing in. Hello from button.");
    }
});

signUpButton.addEventListener('click', async () => {
    console.log('Sign up button clicked');
    try {
        await signUp();
    } catch (error) {
        console.log("An error occurred while signing up. Hello from button.");
    }
});

logOutButton.addEventListener('click', async () => {
    console.log('Log out button clicked');
    try {
        await logOut();
    } catch (error) {
        console.error("An error occurred while signing out:", error);
        if (error.code === 'auth/invalid-email') {
            console.error("Invalid email address.");
        } else if (error.code === 'auth/user-not-found') {
            console.error("User not found.");
        } else {
            console.error("An unexpected authentication error occurred.");
        }
    }
});

backToSignInButton.addEventListener('click', () => {
    backToSignInButton.style.display = 'none';
    signUpButton.style.display = 'none';
    signInButton.style.display = 'block';
    username.style.display = 'none';
    confirmPassword.style.display = 'none';
    createAccountButton.style.display = 'block';
})

createAccountButton.addEventListener('click', () => {
    backToSignInButton.style.display = 'block';
    signUpButton.style.display = 'block';
    signInButton.style.display = 'none';
    username.style.display = 'block';
    confirmPassword.style.display = 'block';
    createAccountButton.style.display = 'none';
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in');
        pageStatus = 'signed in';
        statusMessage.textContent = 'User '  + user.email + ' is signed in.';
        logOutButton.style.display = 'block';
        const aspectContainer = document.getElementById('aspect-container');
        document.getElementById('email').style.display = 'none';
        document.getElementById('password').style.display = 'none';
        document.getElementById('sign-in').style.display = 'none';
        document.getElementById('sign-up').style.display = 'none';
        document.getElementById('create-account').style.display = 'none';
        document.getElementById('username').style.display = 'none';
        document.getElementById('confirmPassword').style.display = 'none';
        document.getElementById('back-to-sign-in').style.display = 'none';
        aspectContainer.style.display = 'flex';
        aspectContainer.appendChild(statusMessage);
        aspectContainer.appendChild(logOutButton);
        aspectContainer.appendChild(removeLevelOne);
        document.body.appendChild(statusMessage, logOutButton, removeLevelOne);
        let divManager;

        (async () => {
            divManager = new DivManager(wordData); // Assign instance to the outer variable
            try {
                await divManager.initialize(); // Wait for initialization to complete
                divManager.shuffledData = divManager.shuffleArray(wordData); // Execute after initialization
                console.log(divManager.shuffledData);
                console.log(' is shuffledData');
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        })();
        
        setTimeout(() => { // Access divManager after ensuring it’s initialized
            if (divManager) {
                console.log(divManager.shuffledData?.ENwords || "Shuffled data not available yet");
                console.log("is shuffled ENwords");
            } else {
                console.log("divManager not initialized yet.");
            }
        }, 1100); // Add a delay to allow asynchronous operation to complete
        
        window.divManager = divManager; // Make it globally available
        
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2000);
    } else {
        console.log('User is signed out');
        pageStatus = 'signed out';
        statusMessage.textContent = 'User is signed out.';
        logOutButton.style.display = 'none';
        document.getElementById('aspect-container').style.display = 'none';
        document.getElementById('email').style.display = 'block';
        document.getElementById('password').style.display = 'block';
        document.getElementById('sign-in').style.display = 'block';
        document.getElementById('password').value = '';
        document.getElementById('email').value = '';
        document.getElementById('create-account').style.display = 'block';
        document.body.appendChild(statusMessage, logOutButton, removeLevelOne);
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2000);
    }
})

class DivManager {
    constructor(wordData) {
        this.divID = 0;
        this.divs = [];
        this.ENwords = wordData.ENwords;
        this.UAwords = wordData.UAwords;
        this.charToGuess = '';
        this.wordtoguess = '';
        this.wordtoguessTranslation = '';
        this.shuffledData = undefined
        this.currentWordIndex = 0;
        this.ENwordsLevelOne = [];
        this.UAwordsLevelOne = [];
    }
    
    shuffleArray(arrayOfWords) {
        const { ENwords, UAwords } = arrayOfWords;
        const filteredIndices = ENwords
            .map((word, index) => (this.ENwordsLevelOne.includes(word) ? null : index))
            .filter(index => index !== null);
        const filteredENwords = filteredIndices.map(index => ENwords[index]);
        const filteredUAwords = filteredIndices.map(index => UAwords[index].replace('\t', ' | '));
        for (let i = filteredIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredENwords[i], filteredENwords[j]] = [filteredENwords[j], filteredENwords[i]];
            [filteredUAwords[i], filteredUAwords[j]] = [filteredUAwords[j], filteredUAwords[i]];
        }
        return {
            ENwords: filteredENwords,
            UAwords: filteredUAwords,
        };
    }

    async loadWordLists() {
        const docSnap = await getDoc(doc(db, "wordLists", "list2"));
        this.ENwordsLevelOne = docSnap.exists() ? docSnap.data().EN1 : [];
        console.log(this.ENwordsLevelOne);
        console.log("is ENwordsLevelOne");
        this.UAwordsLevelOne = docSnap.exists() ? docSnap.data().UA1 : [];
        console.log(this.UAwordsLevelOne);
        console.log(' is UAwordsLevelOne');
    }
        
    async loadAndDisplayUserInfo() {
        if (getAuth().currentUser) {
            this.userId = getAuth().currentUser.uid;
            console.log("User UID:", this.userId);
        
            const docSnapUserDisplay = await getDoc(doc(db, "users", this.userId));
            if (docSnapUserDisplay.exists()) {
                document.getElementById('usernameDisplay').textContent = docSnapUserDisplay.data().username + ' ' + this.ENwordsLevelOne.length; // Accessing ENwordsLevelOne here
            } else {
                console.log('No such document!');
            }
        } else {
            console.log("No user is signed in.");
        }
    }
    
    async initialize() {
        await this.loadWordLists();
        await this.loadAndDisplayUserInfo();
    }
    
    splitWordDiv() {
        this.wordToGuess = this.shuffledData.ENwords[0];
        this.wordtoguessTranslation = this.shuffledData.UAwords[0];
        const contentToSplit = this.wordToGuess;
        console.log(contentToSplit + ' with index ' + this.currentWordIndex + ' is content to split');
        let leftPart = document.getElementById('leftText');
        let rightPart = document.getElementById('rightText');
        const myRandomCharIndex = (Math.floor(Math.random() * (contentToSplit.length - 1)) + 1);
        let divUA = document.getElementById('UAtext');
        divUA.textContent = this.wordtoguessTranslation;
        this.charToGuess = contentToSplit.charAt(myRandomCharIndex);
        console.log(this.charToGuess + ' is assigned char to guess');
        let leftContent = contentToSplit.slice(0, myRandomCharIndex);
        let rightContent;
        if (myRandomCharIndex === contentToSplit.length - 1) {
            rightContent = '';
        } else {
            rightContent = contentToSplit.slice(myRandomCharIndex + 1, contentToSplit.length);
        }
        if (leftContent.endsWith(' ')) { // Add &nbsp; to preserve whitespace
            leftContent = leftContent.slice(0, -1) + '\u00A0';  // Replace space with &nbsp;
        }
        if (rightContent.startsWith(' ')) {
            rightContent = '\u00A0' + rightContent.slice(1);  // Replace space with &nbsp;
        }
        leftPart.textContent = leftContent;
        rightPart.textContent = rightContent;
        console.log(leftPart.textContent + ' & ' + rightPart.textContent + ' are assigned sides');
    }

    createDiv() {
        const aspectD = document.getElementById('aspect-container');
        const myContent = this.wordtoguess;
        const div = document.createElement('div');
        div.id = this.divID;
        this.divID = this.divID + 1;
        div.textContent = `${myContent}`;
        div.style.position = 'absolute';
        div.style.top = '50%';
        div.style.fontSize = '3rem';
        div.style.opacity = '0';
        div.style.transition = 'opacity 0.2s, top 5s cubic-bezier(0,.82,.43,.92), font-size 5s cubic-bezier(0,.82,.43,.92)';
        aspectD.appendChild(div);
        this.divs.push(div);
        this.wordtoguess = this.shuffledData.ENwords.shift();
        this.wordtoguessTranslation = this.shuffledData.UAwords.shift();

        setTimeout(() => {
            div.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            div.style.transition = 'opacity 5s cubic-bezier(0,.82,.43,.92), top 5s linear, font-size 5s linear';
            div.style.opacity = '0';
        }, 5100);

        setTimeout(() => {
            aspectD.removeChild(div);
            this.divs = this.divs.filter((d) => d !== div);
        }, 10100);

        return div;
    }

    moveAllDivsDown() {
        setTimeout(() => {
            this.divs.forEach((div) => {
                //div.style.border = '1px solid red';
                const currentFontSize = parseFloat(div.style.fontSize);
                const currentTop = parseFloat(div.style.top);
                //console.log(currentTop);
                div.style.fontSize = `${currentFontSize - 0.8}rem`;
                div.style.top = `${currentTop + 7}%`;
            });
        }, 150);
    }

    showConstructor(moment) {
        /* console.log(this.divID + ' is divID');
        console.log(this.divs.length + ' is divs length');
        console.log(this.currentWordIndex + ' is curWorInd'); */
        console.log(this.charToGuess + ' is charToGuess');
        console.log(this.wordToGuess + ' is wordToGuess');
        console.log('When? ' + moment);
    }
}

function lightDarkMode(){
    if (document.body.classList.contains('lightmode')) {
        document.body.classList.remove('lightmode');
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.remove('darkmode');
        document.body.classList.add('lightmode');
    }
}

document.addEventListener('keydown', (myEvent) => {
    if (myEvent.key === 'Enter') {
        myEnterButton.click();
    }
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const aspectDiv = document.createElement('div');
const userNameDisplay = document.createElement('div');
const toggleButton = document.createElement('button');
const myEnterButton = document.createElement('button');
const removeLevelOne = document.createElement('button');
const uaDiv = document.createElement('div');
const connectedDiv = document.createElement('div');
const leftDiv = document.createElement('div');
const myInput = document.createElement('input');
const rightDiv = document.createElement('div');
aspectDiv.id = 'aspect-container';
userNameDisplay.id = 'usernameDisplay';
aspectDiv.style.display = 'none';
connectedDiv.id = 'connectedText';
leftDiv.id = 'leftText';
rightDiv.id = 'rightText';
myInput.id = 'myInput';
myInput.type = 'text';
myInput.setAttribute('autocapitalize', 'none');
myInput.maxLength = '1';
myInput.autocomplete = 'off';
myInput.value = '';
myInput.style.display = 'none';
myEnterButton.id = 'enterButton';
myEnterButton.textContent = 'Enter'
removeLevelOne.textContent = 'Reset progress';
removeLevelOne.id = 'removeLevelOne';
toggleButton.id = 'toggleButton';
toggleButton.textContent = 'Light/Dark Mode';
uaDiv.id = 'UAtext';
uaDiv.textContent = 'Вітаю у грі. Натисніть "Enter" щоб почати.';
document.body.appendChild(aspectDiv);
aspectDiv.appendChild(uaDiv);
aspectDiv.appendChild(myEnterButton);
aspectDiv.appendChild(connectedDiv);
aspectDiv.appendChild(removeLevelOne);
aspectDiv.appendChild(userNameDisplay);
aspectDiv.appendChild(toggleButton);
connectedDiv.appendChild(leftDiv);
connectedDiv.appendChild(myInput);
connectedDiv.appendChild(rightDiv);

removeLevelOne.addEventListener('click', () => {removeAllWordsLevelOne();})
toggleButton.addEventListener('click', () => {lightDarkMode();});
myEnterButton.addEventListener('click', () => {
    if (myInput.value.toLowerCase() == divManager.charToGuess.toLowerCase()) {
        if (divManager.shuffledData.ENwords.length === 0) {
            uaDiv.textContent = "Вітаю з перемогою!";
            myInput.value = '';
            document.getElementById('leftText').textContent = '';
            document.getElementById('rightText').textContent = '';
            return;
        } else {
            console.log(myInput.value + ' & ' + divManager.charToGuess + ' are equal chars to guess');
            if (divManager.wordtoguess !== '') {
                divManager.ENwordsLevelOne.push(divManager.wordtoguess);
                divManager.UAwordsLevelOne.push(divManager.wordtoguessTranslation);
            }            
            setTimeout(storeWordsLevelOne, 2000);
            divManager.loadAndDisplayUserInfo();
            console.log(divManager.ENwordsLevelOne);
            console.log('is EN level one');
            console.log(divManager.UAwordsLevelOne);
            console.log('is UA level one');
            divManager.splitWordDiv();
            divManager.createDiv();
        }
        divManager.moveAllDivsDown();
    } else {
        console.log(myInput.value + ' & ' + divManager.charToGuess + ' are not equal chars to guess');
        const connectedText = document.getElementById('connectedText');
        connectedText.classList.add('shake');
        setTimeout(() => {
            connectedText.classList.remove('shake');
        }, 500);
    }
    divManager.showConstructor('After enter clicked');
    myInput.value = '';
    myInput.style.display = 'flex';
    myInput.focus();
});

async function storeWords() {
    try {
        await setDoc(doc(db, "wordLists", "list1"), { 
            ENList: divManager.ENwords, 
            UAList: divManager.UAwords 
          });
        console.log("Words stored successfully!");
    } catch (error) {
        console.log("Error writing document; ", error);
    }
}

async function storeWordsLevelOne() {
    try {
        await setDoc(doc(db, "wordLists", "list2"), {
            EN1: divManager.ENwordsLevelOne,
            UA1: divManager.UAwordsLevelOne
        });
        console.log("Words stored successfully!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

async function removeAllWordsLevelOne() {
    try {
        await updateDoc(doc(db, "wordLists", "list2"), {
            EN1: [],
            UA1: []
        });
        console.log("Words removed successfully!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.trim() === '') {
        statusMessage.textContent = 'Email is required';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    } else if (!email.includes('@')) {
        statusMessage.textContent = 'Email should contain @';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    } else if (password.length < 6) {
        statusMessage.textContent = 'Password should be at least 6 characters long';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    }

    statusMessage.textContent = 'Signing in...';
    statusMessage.style.opacity = '1';
    setTimeout(() => {statusMessage.style.opacity = "0"}, 5000);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in: " + user.email);
        pageStatus = 'signed in';
        statusMessage.textContent = "Signed in successfully! Page status: " + pageStatus;
    } catch (error) {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
            statusMessage.textContent = "Invalid email or password. Please try again.";
            return;
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
    /* document.getElementById('email').focus(); */
    document.getElementById('email').value = '';
    document.getElementById('email').style.display = 'none';
    /* document.getElementById('password').focus(); */
    document.getElementById('password').value = '';
    document.getElementById('password').display = 'none';
}

async function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (username.trim() === '') {
        statusMessage.textContent = 'Username is required';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    }
    if (email.trim() === '') {
        statusMessage.textContent = 'Email is required';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    } else if (!email.includes('@')) {
        statusMessage.textContent = 'Email should contain @';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    } else if (password !== confirmPassword) {
        statusMessage.textContent = 'Passwords do not match';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    } else if (password.length < 6) {
        statusMessage.textContent = 'Password should be at least 6 characters long';
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
        return;
    } else {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            //await sendEmailVerification(user);
            
            await updateProfile(user, {
                displayName: username
            });

            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                email: user.email,
                createdAt: new Date()
                //emailVerified: false
            });
            
            console.log('User signed up and profile created');
            pageStatus = 'signed in';
            statusMessage.textContent = pageStatus;
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.code === 'auth/email-already-in-use') {
                statusMessage.textContent = 'Email address is already in use.';
            }
        }

        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500);
    }
}

async function logOut() {
    try {
        await signOut(auth);
        pageStatus = 'signed out';
        statusMessage.textContent = 'User signed out. Page status: ' + pageStatus;
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2000);
        window.location.reload();
    } catch (error) {
        console.log("An error occurred while signing out");
    }
    document.getElementById('email').display = 'block';
    document.getElementById('password').display = 'block';
}

//divManager.showConstructor('On start');
