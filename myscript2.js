class DivManager {
    constructor() {
        this.divID = 0;
        this.divs = [];
        this.words = ['Hello', 'World', 'Welcome', 'Website'];
        this.currentWordIndex = 0;
    }

    createDiv() {
        const myContent = this.words[this.currentWordIndex];
        const div = document.createElement('div');
        div.id = this.divID++;
        div.textContent = `${myContent + `${div.id}`}`;
        div.style.position = 'absolute';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, 0%)';
        div.style.top = '20vh';
        div.style.fontSize = '7vh';
        div.style.border = '1px solid white';
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

        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;

        return div;
    }

    moveAllDivsDown() {
        setTimeout(() => {
            this.divs.forEach((div) => {
                const currentFontSize = parseFloat(div.style.fontSize);
                const currentTop = parseFloat(div.style.top);
                div.style.fontSize = `${currentFontSize - 1}vh`;
                div.style.top = `${currentTop + 10}vh`;
            });
        }, 150);
    }

}

function splitWordDiv(content) {
    let leftContent = content.slice(0, content.length / 2);
    let rightContent = content.slice(content.length / 2, content.length);
    const leftPart = document.getElementById('leftText');
    const rightPart = document.getElementById('rightText');
    leftPart.textContent = leftContent;
    rightPart.textContent = rightContent;
}

const divManager = new DivManager();
const myInput = document.getElementById('myInput');
const toggleButton = document.getElementById('createButton');
const myEnterButton = document.getElementById('enterButton');

toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('lightmode')) {
        document.body.classList.remove('lightmode');
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.remove('darkmode');
        document.body.classList.add('lightmode');
    }
});

myEnterButton.addEventListener('click', () => {
    console.log(myInput.value);
    if (myInput.value == 'o') {
        divManager.createDiv();
        divManager.moveAllDivsDown();
    } else {
        const connectedText = document.getElementById('connectedText');
        connectedText.classList.add('shake');
        setTimeout(() => {
            connectedText.classList.remove('shake');
        }, 500);
    }
});

splitWordDiv('bobobboboob');