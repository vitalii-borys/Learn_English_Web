class DivManager {
    constructor(wordData) {
        this.divID = 0;
        this.divs = [];
        this.ENwords = wordData.ENwords;
        this.UAwords = wordData.UAwords;
        this.currentWordIndex = 0;
        this.charToGuess = '';
        this.wordtoguess = 'lean';
        this.topUacontent = 'нахилитися';
    }

    displayWords() {
        console.log(this.ENwords.map(word => `${word}`).join(' ') +
        this.UAwords.map(word => `${word}`).join(' '));
        console.log("is output of DisplayWords")
    }

    splitWordDiv(contentToSplit) {        
        console.log(contentToSplit + ' is content to split')
        let leftPart = document.getElementById('leftText');
        let rightPart = document.getElementById('rightText');
        const myRandomCharIndex = (Math.floor(Math.random() * (contentToSplit.length - 1)) + 1);
        let divUA = document.getElementById('UAtext');
        let myUAContent = this.UAwords[this.currentWordIndex];
        divUA.textContent = myUAContent;
        this.charToGuess = contentToSplit.charAt(myRandomCharIndex);
        console.log(this.charToGuess + ' is assigned char to guess');
        let leftContent = contentToSplit.slice(0, myRandomCharIndex);
        let rightContent;
        if (myRandomCharIndex === contentToSplit.length - 1) {
            rightContent = '';
        } else {
            rightContent = contentToSplit.slice(myRandomCharIndex + 1, contentToSplit.length);
        }
        leftPart.textContent = leftContent;
        rightPart.textContent = rightContent;
        console.log(leftPart.textContent + ' & ' + rightPart.textContent + ' are assigned sides');
    }

    createDiv() {
        const myContent = this.wordtoguess;/* `${this.ENwords[this.currentWordIndex - 1]}`; */
        const div = document.createElement('div');
        div.id = this.divID;
        this.divID = this.divID + 1;
        div.textContent = `${myContent/*  + `${div.id}` */}`;
        div.style.position = 'absolute';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, 0%)';
        div.style.top = '15rem';
        div.style.fontSize = '3rem';
        div.style.opacity = '0';
        div.style.transition = 'opacity 0.2s, top 5s cubic-bezier(0,.82,.43,.92), font-size 5s cubic-bezier(0,.82,.43,.92)';
        document.body.appendChild(div);
        this.divs.push(div);

        this.wordtoguess = this.ENwords[this.currentWordIndex];

        setTimeout(() => {
            div.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            div.style.transition = 'opacity 5s cubic-bezier(0,.82,.43,.92), top 5s linear, font-size 5s linear';
            div.style.opacity = '0';
        }, 5100);

        setTimeout(() => {
            document.body.removeChild(div);
            this.divs = this.divs.filter((d) => d !== div);
        }, 10100);

        //this.currentWordIndex = (this.currentWordIndex + 1) % this.ENwords.length;

        return div;
    }

    moveAllDivsDown() {
        setTimeout(() => {
            this.divs.forEach((div) => {
                const currentFontSize = parseFloat(div.style.fontSize);
                const currentTop = parseFloat(div.style.top);
                div.style.fontSize = `${currentFontSize - 0.8}rem`;
                div.style.top = `${currentTop + 5}rem`;
            });
        }, 150);
    }

    showConstructor(moment) {
        console.log(this.divID + ' is divID');
        console.log(this.divs.length + ' is divs length');
        //console.log(this.ENwords);
        //console.log(this.UAwords);
        console.log(this.currentWordIndex + ' is curWorInd');
        console.log(this.charToGuess + ' is chartog');
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

const myEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
});

document.addEventListener('keydown', (myEvent) => {
    if (myEvent.key === 'Enter') {
        myEnterButton.click();
    }
});
import { wordData } from "./wordData.js";
const divManager = new DivManager(wordData);
window.divManager = divManager; // Make it globally available
divManager.displayWords();
const toggleButton = document.createElement('button');
const myEnterButton = document.createElement('button');
const uaDiv = document.createElement('div');
const connectedDiv = document.createElement('div');
const leftDiv = document.createElement('div');
const myInput = document.createElement('input');
const rightDiv = document.createElement('div');
connectedDiv.id = 'connectedText';
leftDiv.id = 'leftText';
rightDiv.id = 'rightText';
myInput.id = 'myInput';
myInput.type = 'text';
myInput.maxLength = '1';
myInput.value = '';
myEnterButton.id = 'enterButton';
myEnterButton.textContent = 'Enter'
toggleButton.id = 'toggleButton';
uaDiv.id = 'UAtext';
document.body.appendChild(uaDiv);
document.body.appendChild(toggleButton);
document.body.appendChild(myEnterButton);
document.body.appendChild(connectedDiv);
connectedDiv.appendChild(leftDiv);
connectedDiv.appendChild(myInput);
connectedDiv.appendChild(rightDiv);

toggleButton.addEventListener('click', () => {lightDarkMode();});
myEnterButton.addEventListener('click', () => {
    if (myInput.value.toLowerCase() == divManager.charToGuess.toLowerCase()) {
        console.log(myInput.value + ' & ' + divManager.charToGuess + ' are equal chars to guess');
        divManager.splitWordDiv(divManager.ENwords[divManager.currentWordIndex]);
        divManager.createDiv();
        divManager.currentWordIndex = (divManager.currentWordIndex + 1) % divManager.ENwords.length;
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

divManager.showConstructor('On start');
divManager.splitWordDiv(divManager.wordtoguess);
uaDiv.textContent = divManager.topUacontent;
divManager.showConstructor('after splitting')
const jsonString = '{"height": 215, "age": 25, "isAngry": false}';
const user = JSON.parse(jsonString);
console.log(user.age + " hi, " + user.height);