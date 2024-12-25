class DivManager {
    constructor() {
        this.divID = 0;
        this.divs = [];
        this.ENwords = ["example", "words", "here"];
        this.UAwords = ["приклад", "слова", "тут"];
        this.currentWordIndex = 0;
        this.charToGuess = '';
    }

    splitWordDiv(contentToSplit) {
        
        let leftPart = document.getElementById('leftText');
        let rightPart = document.getElementById('rightText');
        let myUAContent = this.UAwords[this.currentWordIndex];
        //let divEN = document.getElementById('connectedText');
        let divUA = document.getElementById('UAtext');
        //divEN.textContent = content;
        divUA.textContent = myUAContent;
        
        const myRandomCharIndex = (Math.floor(Math.random() * (contentToSplit.length - 1)) + 1);
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
        const myContent = `${this.ENwords[this.currentWordIndex]}`;
        const div = document.createElement('div');
        div.id = this.divID++;
        div.textContent = `${myContent + `${div.id}`}`;
        div.style.position = 'absolute';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, 0%)';
        div.style.top = '15rem';
        div.style.fontSize = '3rem';
        div.style.opacity = '0';
        div.style.transition = 'opacity 0.2s, top 5s cubic-bezier(0,.82,.43,.92), font-size 5s cubic-bezier(0,.82,.43,.92)';
        document.body.appendChild(div);
        this.divs.push(div);

        setTimeout(() => {
            div.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            div.style.transition = 'opacity 5s linear, top 5s linear, font-size 5s linear';
            div.style.opacity = '0';
        }, 5100);

        setTimeout(() => {
            document.body.removeChild(div);
            this.divs = this.divs.filter((d) => d !== div);
        }, 10100);

        this.currentWordIndex = (this.currentWordIndex + 1) % this.ENwords.length;

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

const divManager = new DivManager();
const myInput = document.getElementById('myInput');
const toggleButton = document.getElementById('toggleButton');
const myEnterButton = document.getElementById('enterButton');

let content = divManager.ENwords[divManager.currentWordIndex];
divManager.splitWordDiv(divManager.ENwords[divManager.currentWordIndex]);
toggleButton.addEventListener('click', () => {lightDarkMode();});

myEnterButton.addEventListener('click', () => {    
    if (myInput.value == divManager.charToGuess) {
        console.log(myInput.value + ' & ' + divManager.charToGuess + ' are equal chars to guess');
        divManager.splitWordDiv(divManager.ENwords[divManager.currentWordIndex]);
        divManager.currentWordIndex++;
        divManager.createDiv();
        divManager.moveAllDivsDown();
    } else {
        console.log(myInput.value + ' & ' + divManager.charToGuess + ' are not equal chars to guess');
        const connectedText = document.getElementById('connectedText');
        connectedText.classList.add('shake');
        setTimeout(() => {
            connectedText.classList.remove('shake');
        }, 500);
    }
});