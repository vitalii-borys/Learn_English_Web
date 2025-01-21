import { wordData } from "./wordData_test.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDoc, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
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

class DivManager {
    constructor(wordData) {
        this.divID = 0;
        this.divs = [];
        this.ENwords = wordData.ENwords;
        this.UAwords = wordData.UAwords;
        this.charToGuess = '';
        this.wordtoguess = ''/* 'lean' */;
        this.topUacontent = ''/* 'нахилитися' */;
        this.shuffledData = undefined/* this.shuffleArray(wordData) */;
        this.currentWordIndex = 0;
        this.ENwordsLevelOne = [];
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

    async initialize() {
        const docSnap = await getDoc(doc(db, "wordLists", "list2"));
        this.ENwordsLevelOne = docSnap.exists() ? docSnap.data().EN1 : [];
        console.log(this.ENwordsLevelOne);
        console.log(' is ENwordsLevelOne');
    }
    
    splitWordDiv() {
        this.wordToGuess = this.shuffledData.ENwords[0];
        const contentToSplit = this.wordToGuess;
        console.log(contentToSplit + ' with index ' + this.currentWordIndex + ' is content to split')
        let leftPart = document.getElementById('leftText');
        let rightPart = document.getElementById('rightText');
        const myRandomCharIndex = (Math.floor(Math.random() * (contentToSplit.length - 1)) + 1);
        let divUA = document.getElementById('UAtext');
        let myUAContent = this.shuffledData.UAwords.shift();
        divUA.textContent = myUAContent;
        this.topUacontent = myUAContent;
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
                const currentFontSize = parseFloat(div.style.fontSize);
                const currentTop = parseFloat(div.style.top);
                div.style.fontSize = `${currentFontSize - 0.8}rem`;
                div.style.top = `${currentTop + 5}%`;
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

// Access divManager after ensuring it’s initialized
setTimeout(() => {
    if (divManager) {
        console.log(divManager.shuffledData?.ENwords || "Shuffled data not available yet");
        console.log("is ENwords");
    } else {
        console.log("divManager not initialized yet.");
    }
}, 1100); // Add a delay to allow asynchronous operation to complete

window.divManager = divManager; // Make it globally available
const aspectDiv = document.createElement('div');
const toggleButton = document.createElement('button');
const myEnterButton = document.createElement('button');
const uaDiv = document.createElement('div');
const connectedDiv = document.createElement('div');
const leftDiv = document.createElement('div');
const myInput = document.createElement('input');
const rightDiv = document.createElement('div');
aspectDiv.id = 'aspect-container';
connectedDiv.id = 'connectedText';
leftDiv.id = 'leftText';
rightDiv.id = 'rightText';
myInput.id = 'myInput';
myInput.type = 'text';
myInput.setAttribute('autocapitalize', 'none');
myInput.maxLength = '1';
myInput.value = '';
myEnterButton.id = 'enterButton';
myEnterButton.textContent = 'Enter'
toggleButton.id = 'toggleButton';
uaDiv.id = 'UAtext';
uaDiv.textContent = 'Вітаю у грі. Натисніть "Enter" щоб почати. Гра в тестовому режимі.';
document.body.appendChild(aspectDiv);
aspectDiv.appendChild(toggleButton);
aspectDiv.appendChild(uaDiv);
aspectDiv.appendChild(myEnterButton);
aspectDiv.appendChild(connectedDiv);
connectedDiv.appendChild(leftDiv);
connectedDiv.appendChild(myInput);
connectedDiv.appendChild(rightDiv);

async function fetchAndDisplayWords() {
    const wordsContainer = document.createElement("div");
    wordsContainer.style.fontSize = '2vh';
    aspectDiv.appendChild(wordsContainer);
    try {
        const docRef = doc(db, "wordLists", "list2");
        const docSnap = await getDoc(docRef);
        wordsContainer.innerHTML = "";
        if (docSnap.exists()) {
            const wordData = docSnap.data();
            const enWords = wordData.EN1 || [];
            const enWordsDiv = document.createElement("div");
            enWordsDiv.textContent = `${enWords.join(" ")}`;
            wordsContainer.appendChild(enWordsDiv);
            /* const uaWordsDiv = document.createElement("div");
            uaWordsDiv.textContent = `${uaWords.join(" ")}`;
            wordsContainer.appendChild(uaWordsDiv); */
        } else {
            wordsContainer.textContent = "No words found in the database.";
        }
    } catch (error) {
        console.error("Error fetching words:", error);
        wordsContainer.textContent = "An error occurred while fetching the words.";
    }
}

const button2 = document.createElement("button");
button2.innerText = "Fetch EN&UA Words";
button2.style.fontSize = '3vh';
button2.addEventListener("click", fetchAndDisplayWords);
aspectDiv.appendChild(button2);

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
            }            
            setTimeout(storeWordsLevelOne, 1000);
            console.log(divManager.ENwordsLevelOne);
            console.log('is level one');
            divManager.splitWordDiv();
            divManager.createDiv();
        }
        /* divManager.currentWordIndex = (divManager.currentWordIndex + 1) % divManager.shuffledData.ENwords.length; */
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
    myInput.focus();
});

/* await setDoc(doc(db, "wordLists", "list1"), { 
    ENList: divManager.ENwords, 
    UAList: divManager.UAwords 
  });
console.log("Words stored successfully!"); */

async function storeWordsLevelOne() {
    try {
        await setDoc(doc(db, "wordLists", "list2"), {
            EN1: divManager.ENwordsLevelOne
        });
        console.log("Words stored successfully!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

divManager.showConstructor('On start');

