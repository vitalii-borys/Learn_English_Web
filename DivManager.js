class DivManager {
    constructor() {
        this.divs = [];
        this.countDisplay = null;
    }

    createDiv() {
        const newDiv = document.createElement('div');
        newDiv.style.backgroundColor = 'yellow';
        newDiv.style.width = '100px';
        newDiv.style.height = '100px';
        newDiv.textContent = 'Div' + (this.divs.length + 1);
        document.body.appendChild(newDiv);
        this.divs.push(newDiv);
        console.log('Divs count = ' + this.divs.length);
        if(this.countDisplay) {
            this.countDisplay.textContent = this.divs.length;
        }
    }
    setCountDisplay(element) {
        this.countDisplay = element;
    }
}

const manager = new DivManager();

const button = document.createElement('button');
button.textContent = 'Create Div';
button.style.height = '100px';
button.onclick = () => manager.createDiv();
document.body.appendChild(button);

const divForCount = document.createElement('div');
divForCount.setAttribute('div', manager.divs.length);
divForCount.style.backgroundColor = 'red';
divForCount.style.height = '100px';
divForCount.style.width = '200px';
divForCount.style.fontSize = '5vh';
divForCount.textContent = '0';
document.body.appendChild(divForCount);
manager.setCountDisplay(divForCount);