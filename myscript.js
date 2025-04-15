import { wordData } from "./wordData.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, getDoc, setDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, applyActionCode, signOut, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

console.log('./myscript.js is loaded');

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

let userIn = false;
console.log(userIn + ' is userIn');

const myApp = initializeApp(firebaseConfig);
const auth = getAuth(myApp);

// Create a container for the UI
const container = document.createElement("div");
container.id = 'container';
document.body.appendChild(container);

// Create a heading element to display status messages
const statusHeading = document.createElement("span");
statusHeading.style.fontSize = '1.8rem'
statusHeading.id = "status";
container.appendChild(statusHeading);

// Create the "Confirm Email" button
const confirmButton = document.createElement("button");
confirmButton.id = "confirmBtn";
confirmButton.textContent = "Confirm Email";
container.appendChild(confirmButton);

// Create the "Continue to Website" button (hidden by default)
const continueButton = document.createElement("button");
continueButton.id = "continueBtn";
continueButton.textContent = "Continue to Website";
continueButton.style.display = "none";
container.appendChild(continueButton);

// When clicked, the Continue button redirects the user
continueButton.addEventListener("click", () => {
  window.location.href = "https://vitalii-borys.github.io/Learn_English_Web/";
  //window.location.href = "http://127.0.0.1:5500/index.html";
});

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");
const oobCode = urlParams.get("oobCode");

// Define the confirmEmail function which verifies the email using URL parameters
function confirmEmail() {
  // Parse URL parameters for mode and oobCode
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const oobCode = urlParams.get("oobCode");

  // Check if the URL is valid for email verification
  if (mode === "verifyEmail" && oobCode) {
    applyActionCode(auth, oobCode)
      .then(() => {
        // Email successfully verified
        statusHeading.textContent = "Your email has been verified!";
        // Hide the Confirm Email button and show the Continue button
        confirmButton.style.display = "none";
        continueButton.style.display = "inline-block";
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
        statusHeading.textContent = "There was an error verifying your email.";
      });
  } else {
    statusHeading.textContent = "Invalid verification link.";
  }
}

// Attach the confirmEmail function to the Confirm Email button's click event
confirmButton.addEventListener("click", confirmEmail);

let pageStatus = 'signed out';
function createAuthButton(buttonTextContent, buttonClassName, buttonId) {
    const signButton = document.createElement('button');
    signButton.textContent = buttonTextContent;
    signButton.className = buttonClassName;
    signButton.id = buttonId;
    registrationForm.appendChild(signButton);
}

function createInput(inputType, inputPlaceholder, inputId) {
    const input = document.createElement('input');
    input.type = inputType;
    input.placeholder = inputPlaceholder;
    input.id = inputId;
    input.style.display = 'block';
    registrationForm.appendChild(input);
}

const registrationForm = document.createElement('div');
registrationForm.id = 'registration-form';
registrationForm.style.display = 'flex';
registrationForm.style.flexDirection = 'column';
document.body.appendChild(registrationForm);

createInput('text', 'Ім\'я у грі', 'username');
createInput('email', 'Електронна пошта', 'email');
createInput('password', 'Пароль', 'password');
createInput('password', 'Підтвердити пароль', 'confirmPassword');
createAuthButton('Зайти', 'sign-up', 'sign-in');
createAuthButton('Приєднатися', 'sign-in', 'sign-up');
createAuthButton('Вихід', 'log-out', 'log-out');
createAuthButton('Створити акаунт', 'create-account', 'create-account');
createAuthButton('Назад до входу', 'sign-in', 'back-to-sign-in');

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

console.log("Mode:", mode);  // Check the value of mode
console.log("oobCode:", oobCode); // Check the value of oobCode

if (mode === "verifyEmail" && oobCode) {
    console.log('Hello World');
    console.log(document.getElementById('email'));
    document.getElementById('container').style.display = 'flex';
    document.getElementById('email').style.display = 'none';
    document.getElementById('password').style.display = 'none';
    document.getElementById('sign-in').style.display = 'none';
    document.getElementById('create-account').style.display = 'none';
} else if (mode !== "verifyEmail") {
    document.getElementById('container').style.display = 'none';
    console.log("Not verify email page")
}

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

const tryWithoutRegistrationButton = document.createElement('button');
tryWithoutRegistrationButton.id = 'try-without-registration';
tryWithoutRegistrationButton.textContent = 'Спробувати без реєстрації';
tryWithoutRegistrationButton.style.fontSize = '1.1rem';
tryWithoutRegistrationButton.style.display = 'block'; // Initially visible
tryWithoutRegistrationButton.style.borderRadius = '4px'; // Initially visible
registrationForm.appendChild(tryWithoutRegistrationButton);

tryWithoutRegistrationButton.addEventListener('click', () => {
    const auth = getAuth();
    const email = 'photoshopprofy@gmail.com';
    const password = '12321232';

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in as guest');
            const user = userCredential.user;
            pageStatus = 'guest';
            statusMessage.textContent = 'You are exploring as a guest.';
            logOutButton.style.display = 'block';
            document.getElementById('aspect-container').style.display = 'flex';
            document.getElementById('email').style.display = 'none';
            document.getElementById('password').style.display = 'none';
            document.getElementById('sign-in').style.display = 'none';
            document.getElementById('sign-up').style.display = 'none';
            document.getElementById('create-account').style.display = 'none';
            document.getElementById('username').style.display = 'none';
            document.getElementById('confirmPassword').style.display = 'none';
            document.getElementById('back-to-sign-in').style.display = 'none';
            statusMessage.style.opacity = '1';
            setTimeout(() => {
                statusMessage.style.opacity = '0';
            }, 2000);
        })
        .catch((error) => {
            console.error('Error signing in as guest:', error);
        });
});

onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
        userIn = true;
        console.log(userIn + ' is userIn');
        aspectDiv.appendChild(infoButton);
        infoButton.style.position = 'absolute';
        infoButton.style.bottom = '2.7rem';
        infoButton.style.left = '0.05rem';
        tryWithoutRegistrationButton.style.display = 'none'; // Hide the button when signed in
        // Existing code for signed-in users...
        const firstSignIn = document.createElement('span');
        firstSignIn.id = 'first-sign-in';
        firstSignIn.textContent = 'Перший запуск триває довше ніж наступні (спробуйте перезавантажити сторінку через 10 секунд, якщо нічого не відбувається)';
        firstSignIn.style.fontSize = '1.8rem';
        firstSignIn.style.alignContent = 'center';
        document.body.appendChild(firstSignIn);
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
        aspectContainer.style.display = 'none';
        aspectContainer.appendChild(statusMessage);
        aspectContainer.appendChild(logOutButton);
        aspectContainer.appendChild(removeLevelOne);
        document.body.appendChild(statusMessage, logOutButton, removeLevelOne);
        let divManager;

        (async () => {
            divManager = new DivManager(wordData); // Assign instance to the outer variable
            try {
                await divManager.initialize(); // Wait for initialization to complete
                document.getElementById('first-sign-in').style.display = 'none';
                document.getElementById('aspect-container').style.display = 'flex';
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
        }, 1800); // Add a delay to allow asynchronous operation to complete
        
        window.divManager = divManager; // Make it globally available
        
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2000);
    } else {
        userIn = false;
        console.log(userIn + ' is userIn');
        registrationForm.appendChild(infoButton);
        tryWithoutRegistrationButton.style.display = 'block'; // Show the button when signed out
        // Existing code for signed-out users...
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

// Helper function to create a timeout promise
function createTimeout(ms, methodName) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`${methodName} timed out after ${ms}ms`));
        }, ms);
    });
}

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
        this.sortedENwords = [];
        this.sortedUAwords = [];
        this.wrongInputCount = 0;
    }

    getSortedData() {
        const ENwords = this.ENwords;
        const UAwords = this.UAwords;
        const combined = ENwords.map((en, index) => ({ en, ua: UAwords[index] }));
        combined.sort((a, b) => a.en.localeCompare(b.en));
        this.sortedENwords = combined.map(item => item.en);
        this.sortedUAwords = combined.map(item => item.ua);
        console.log(this.sortedENwords);
        console.log(this.sortedUAwords);
    }
    
/*     shuffleArray(arrayOfWords) {
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
    } */

    shuffleArray(arrayOfWords) {
        const { ENwords, UAwords } = arrayOfWords;
        const filteredIndices = ENwords
            .map((word, index) => (this.ENwordsLevelOne.includes(word) ? null : index))
            .filter(index => index !== null);
        
        const filteredENwords = filteredIndices.map(index => ENwords[index]);
        const filteredUAwords = filteredIndices.map(index => UAwords[index].replace('\t', ' | '));
        
        return {
            ENwords: filteredENwords,
            UAwords: filteredUAwords,
        };
    }
        

async loadWordLists() {
    try {
        const timeoutDuration = 5000; // 5 seconds timeout
        
        const loadOperation = async () => {
            this.userId = getAuth().currentUser?.uid;
            if (!this.userId) {
                console.error("No user is signed in or user ID is not available yet");
                return;
            }
            
            console.log("User UID:", this.userId);
            const docSnap = await getDoc(doc(db, "wordLists", this.userId));
            this.ENwordsLevelOne = docSnap.exists() ? docSnap.data().EN1 : [];
            console.log(this.ENwordsLevelOne);
            console.log("is ENwordsLevelOne");
            this.UAwordsLevelOne = docSnap.exists() ? docSnap.data().UA1 : [];
            console.log(this.UAwordsLevelOne);
            console.log(' is UAwordsLevelOne');
        };
        
        await Promise.race([
            loadOperation(),
            createTimeout(timeoutDuration, 'loadWordLists')
        ]);
    } catch (error) {
        console.error("Error loading word lists:", error);
        throw error; // Re-throw to allow initialize() to catch it
    }
}
    
async loadAndDisplayUserInfo() {
    try {
        const timeoutDuration = 3000; // 3 seconds timeout
        
        const displayOperation = async () => {
            if (getAuth().currentUser) {
                const docSnapUserDisplay = await getDoc(doc(db, "users", this.userId));
                if (docSnapUserDisplay.exists()) {
                    document.getElementById('usernameDisplay').textContent = docSnapUserDisplay.data().username + ' ' + this.ENwordsLevelOne.length;
                } else {
                    console.log('No such document!');
                }
            } else {
                console.log("No user is signed in.");
            }
        };
        
        await Promise.race([
            displayOperation(),
            createTimeout(timeoutDuration, 'loadAndDisplayUserInfo')
        ]);
    } catch (error) {
        console.error("Error loading user info:", error);
        throw error; // Re-throw to allow initialize() to catch it
    }
}

async initialize() {
    try {
        const timeoutDuration = 10000; // 10 seconds timeout for the entire initialization
        
        const initOperation = async () => {
            await this.loadWordLists();
            await this.loadAndDisplayUserInfo();
            this.getSortedData();
        };
        
        await Promise.race([
            initOperation(),
            createTimeout(timeoutDuration, 'initialize')
        ]);
        
        console.log("Initialization completed successfully");
    } catch (error) {
        console.error("Initialization failed:", error);
        // Show an error message to the user
        const errorElement = document.getElementById('errorMessage') || document.createElement('div');
        if (!errorElement.id) {
            errorElement.id = 'errorMessage';
            errorElement.style.color = 'red';
            errorElement.style.padding = '10px';
            document.body.prepend(errorElement);
        }
        errorElement.textContent = `Failed to initialize: ${error.message}. Please refresh the page.`;
    }
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
        div.style.bottom = '56%';
        div.style.fontSize = '3rem';
        div.style.opacity = '0';
        div.style.transition = 'opacity 0.2s, bottom 5s cubic-bezier(0,.82,.43,.92), font-size 5s cubic-bezier(0,.82,.43,.92)';
        aspectD.appendChild(div);
        this.divs.push(div);
        this.wordtoguess = this.shuffledData.ENwords.shift();
        this.wordtoguessTranslation = this.shuffledData.UAwords.shift();

        setTimeout(() => {
            div.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            div.style.transition = 'opacity 5s cubic-bezier(0,.82,.43,.92), bottom 5s linear, font-size 5s linear';
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
                const currentTop = parseFloat(div.style.bottom);
                //console.log(currentTop);
                div.style.fontSize = `${currentFontSize - 0.8}rem`;
                div.style.bottom = `${currentTop - 8}%`;
            });
        }, 150);
    }

    showConstructor(moment) {
        console.log(this.divID + ' is divID');
        console.log(this.divs.length + ' is divs length');
        console.log(this.currentWordIndex + ' is curWorInd');
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

const db = getFirestore(myApp);
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
const hintButton = document.createElement('button');

const infoDiv = document.createElement('div');
infoDiv.id = 'infoDiv';
infoDiv.style.display = 'none';
aspectDiv.id = 'aspect-container';
userNameDisplay.id = 'usernameDisplay';
aspectDiv.style.display = 'none';
connectedDiv.id = 'connectedText';
leftDiv.id = 'leftText';
rightDiv.id = 'rightText';
myInput.id = 'myInput';
hintButton.id = 'hintButton';
myInput.type = 'text';
myInput.setAttribute('autocapitalize', 'none');
myInput.maxLength = '1';
myInput.autocomplete = 'off';
myInput.value = '';
myInput.style.display = 'none';
hintButton.style.display = 'none';
myEnterButton.id = 'enterButton';
myEnterButton.textContent = 'Enter'
hintButton.textContent = 'Підказка';
removeLevelOne.innerHTML = 'Скинути <br>  прогрес';
removeLevelOne.id = 'removeLevelOne';
toggleButton.id = 'toggleButton';
toggleButton.innerHTML = 'Темна/Світла <br> тема';
uaDiv.id = 'UAtext';
uaDiv.textContent = 'Вітаю у грі. Натисніть "Enter" щоб почати.';
document.body.appendChild(aspectDiv);
document.body.appendChild(infoDiv);
aspectDiv.appendChild(hintButton);
aspectDiv.appendChild(uaDiv);
aspectDiv.appendChild(myEnterButton);
aspectDiv.appendChild(connectedDiv);
aspectDiv.appendChild(removeLevelOne);
aspectDiv.appendChild(userNameDisplay);
aspectDiv.appendChild(toggleButton);
connectedDiv.appendChild(leftDiv);
connectedDiv.appendChild(myInput);
connectedDiv.appendChild(rightDiv);

const infoButton = document.createElement('button');
infoButton.id = 'infobutton';
infoButton.textContent = 'Про сайт';
registrationForm.appendChild(infoButton);

infoButton.addEventListener('click', () => {
    hint.style.display = 'none';
    consonantsVowelsDiv2.style.display = 'none';
    backButton.style.display = 'block';
    if (infoDiv.style.display === 'none') {
        infoDiv.style.display = 'block';
    }
    if (aspectDiv.style.display === 'flex') {
        aspectDiv.style.display = 'none';
    }
    if (registrationForm.style.display === 'flex') {
        registrationForm.style.display = 'none';
    }
});

infoDiv.innerHTML = `
  <h2 style="font-size: 1rem; margin: 0.8rem 0 0.3rem 0;">Про автора</h2>
  <p>Мене звати Борис Віталій. Кожне слово на цьому сайті — плід багаторічного вивчення англійської через перегляд фільмів та серіалів, адаптований для вашого використання. Цей сайт був створений з метою надати простий і легкий метод для щоденного вивчення англійської мови. Адже повторення це основа навчання.</p>
  <h2 style="font-size: 1rem; margin: 0.8rem 0 0.3rem 0;">Контакти</h2>
  <p>Email: <a href="mailto:[photoshopprofy@gmail.com]">[photoshopprofy@gmail.com]</a><br>
  Телефон/Viber/Telegram: +380935946922<br>
  Соц. мережі: <a href="https://www.linkedin.com/in/vitalii-borys-53309b4b/">LinkedIn</a>, <a href="https://www.facebook.com/photoshopprofy">Facebook</a>, <a href="https://www.instagram.com/vitaliy_borys/">Instagram</a></p>  
  <p><strong>Мій проект фотогалереї</strong> - <a href="https://vitalii-borys.github.io/Gallery_HTML_CSS_JS/">Посилання</a><br>
  <h2 style="font-size: 1rem; margin: 0.8rem 0 0.3rem 0;">Політика конфіденційності</h2>
  <p>Ми поважаємо вашу приватність. Усі дані використовуються лише для збереження прогресу в грі. Всі паролі зберігаються відправляються в зашифрованому вигляді в сервіс Firebase. Адміністратор сайту не має доступу до паролів.</p>
`;

const backButton = document.createElement('button');
backButton.id = 'backButton';
backButton.textContent = 'Назад';
backButton.style.display = 'block';
infoDiv.prepend(backButton);

backButton.addEventListener('click', () => {
    infoDiv.style.display = 'none';
    if (userIn) {
        aspectDiv.style.display = 'flex';
    } else {
        registrationForm.style.display = 'flex';
    }
});

function changeInputColor() {
    const char = divManager.charToGuess;
    if (/[aeiouyAEIOUY]/.test(char)) {
        myInput.style.backgroundColor = 'orange'; // Vowel
    } else if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/.test(char)) {
        myInput.style.backgroundColor = 'rgb(174, 174, 207)'; // Consonant
    }
}

const consonantsVowelsDiv2 = document.createElement('div');
  consonantsVowelsDiv2.style.display = 'none';
  consonantsVowelsDiv2.id = 'consonantVowelsHint2';
  consonantsVowelsDiv2.innerHTML = 'Голосна <span style="color: orange;">■</span><br>Приголосна <span style="color: rgb(174, 174, 207);">■</span>';
  aspectDiv.appendChild(consonantsVowelsDiv2);

hintButton.addEventListener('click', () => {
  changeInputColor();
  consonantsVowelsDiv2.style.display = 'block';
});

/* removeLevelOne.addEventListener('click', () => {removeAllWordsLevelOne();}) */
removeLevelOne.addEventListener('click', async () => {
    await removeAllWordsLevelOne();
    window.location.reload();
});

toggleButton.addEventListener('click', () => {lightDarkMode();});

function getWordWindow(words, index) {
    let start = Math.max(0, index - 2);
    let end = start + 5;
    
    if (end > words.length) {
        end = words.length;
        start = Math.max(0, end - 5);
    }
    
    return Array.from({ length: end - start }, (_, i) => start + i);
}

let hint = document.createElement('div');
hint.id = 'hint';
hint.innerHTML = 'hint';
hint.style.display = 'none';
hint.style.position = 'fixed';
hint.style.textAlign = 'center';
hint.style.width = '100%';
hint.style.top = '0';
hint.style.fontSize = '1.5rem';
hint.style.padding = '0.5rem 0';
document.body.appendChild(hint);

myEnterButton.addEventListener('click', () => {
    myInput.style.backgroundColor = 'white';
    hintButton.style.display = 'block';

    if (myInput.value.toLowerCase() == divManager.charToGuess.toLowerCase()) {
        // Correct answer logic
        if (divManager.shuffledData.ENwords.length === 0) {
            uaDiv.textContent = "Вітаю з перемогою!";
            myInput.value = '';
            document.getElementById('leftText').textContent = '';
            document.getElementById('rightText').textContent = '';
            return;
        } else {
            // Hide hint and reset wrong answer counter
            hint.style.display = 'none';
            //document.getElementById('hint').style.display = 'none';
            document.getElementById('aspect-container').style.marginTop = '0'; // Reset container position
            consonantsVowelsDiv2.style.display = 'none';
            divManager.wrongInputCount = 0;

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
        // Wrong answer logic
        divManager.wrongInputCount += 1;
        console.log('Wrong answer count:', divManager.wrongInputCount);
        
        if (divManager.wrongInputCount >= 3) {
            //const hint = document.getElementById('hint');
            hint.style.display = 'block';
            
            // Populate hint content
            let index = divManager.sortedENwords.indexOf(divManager.wordToGuess);
            console.log(index);
            console.log('is index');
            const enIndexes = getWordWindow(divManager.sortedENwords, index);
            const uaIndexes = getWordWindow(divManager.sortedUAwords, index);
            let hintHTML = '';
            for (let i = 0; i < 5; i++) {
                if (enIndexes[i] !== undefined && uaIndexes[i] !== undefined) {
                    hintHTML += `${divManager.sortedENwords[enIndexes[i]]} | ${divManager.sortedUAwords[uaIndexes[i]]}<br>`;
                }
            }
            hint.innerHTML = hintHTML;
            
            // Calculate the hint height and move the aspect container down
            setTimeout(() => {
                const hintHeight = hint.offsetHeight;
                console.log(hintHeight + ' is hint height;');
                document.getElementById('aspect-container').style.marginTop = hintHeight + 'px';
            }, 0);
        }

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

async function storeWordsLevelOne() {
    try {
        this.userId = getAuth().currentUser.uid;
        console.log("User UID:", this.userId);
        await setDoc(doc(db, "wordLists", this.userId), {
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
        divManager.userId = getAuth().currentUser.uid;
        console.log("User UID", divManager.userId);
        await updateDoc(doc(db, "wordLists", divManager.userId), {
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
    //setTimeout(() => {statusMessage.style.opacity = "0"}, 5000);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (!user.emailVerified) {
            pageStatus = 'signed out';
            statusMessage.textContent = 'Email is not verified. User ' + user.email + ' is signed out.';
        } else {
            console.log("User signed in: " + user.email);
            pageStatus = 'signed in';
            /* document.getElementById('email').focus(); */
            document.getElementById('email').value = '';
            //document.getElementById('email').style.display = 'none';
            /* document.getElementById('password').focus(); */
            //document.getElementById('password').value = '';
            document.getElementById('password').style.display = 'none';
            statusMessage.textContent = "Signed in successfully! Page status: " + pageStatus;
        }
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

            const actionCodeSettings = {
                // The URL to your custom verification page
                url: 'https://vitalii-borys.github.io/Learn_English_Web/',
                //url: 'http://127.0.0.1:5500/index.html',
                // Tells Firebase to not handle the code automatically
                handleCodeInApp: true,
              };

            // Send email verification
            await sendEmailVerification(user);

            document.getElementById('email').style.display = 'none';
            document.getElementById('password').style.display = 'none';
            document.getElementById('sign-in').style.display = 'none';
            document.getElementById('sign-up').style.display = 'none';
            document.getElementById('create-account').style.display = 'none';
            document.getElementById('username').style.display = 'none';
            document.getElementById('confirmPassword').style.display = 'none';
            document.getElementById('back-to-sign-in').style.display = 'none';
            console.log('User signed up and profile created');
            //pageStatus = 'signed in';

            alert('Verification emain sent! Please check your inbox.');
            
            await updateProfile(user, {
                displayName: username
            });

            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                email: user.email,
                createdAt: new Date()
                //emailVerified: false
            });
            statusMessage.textContent = 'User signed up and profile created';
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.code === 'auth/email-already-in-use') {
                statusMessage.textContent = 'Email address is already in use.';
            }
        }

        //backToSignInButton.click();
        //window.location.reload();

        statusMessage.style.opacity = '1';
        /* setTimeout(() => {
            statusMessage.style.opacity = '0';
        }, 2500); */
    }
}

async function logOut() {
    if (divManager.userId == 'SDYSQTai4NavmfvZx5CyIxuU75u1') {
        removeAllWordsLevelOne();
        console.log('very goooood');
    }
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