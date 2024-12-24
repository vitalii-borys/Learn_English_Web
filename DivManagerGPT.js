class DivManager {
    constructor() {
        this.divCount = 0; // Counter to keep track of unique IDs
        this.divs = [];
        this.removedIDs = [];
    }

    createDiv(content) {
        const id = this.removedIDs > 0 ? this.removedIDs.shift() : `div-${this.divCount++}`;
        
        const div = document.createElement('div');
        div.textContent = content;
        div.id = id;
        div.style.transform = 'translateX(0px)';
        div.style.transition = 'transform 1s ease-in-out';        
        const myButton = document.createElement('button');
        myButton.textContent = 'Remove';
        myButton.id = `button-${id}`;
        myButton.addEventListener('click', () => {
            console.log(`div with ID: ${div.id} & button with ID: "${myButton.id}" removed`);
            this.removedIDs.push(div.id);
            div.remove();
            myButton.remove();
            resetButton.remove();
            this.divs = this.divs.filter(item => item.div !== div);
        });
        
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.id = `reset-${id}`;
        resetButton.addEventListener('click', () => {
            div.style.backgroundColor = '';
        });

        document.body.appendChild(div);
        document.body.appendChild(myButton);
        document.body.appendChild(resetButton);
        
        this.divs.push({div, myButton, resetButton});
        console.log('div with ID: ' + div.id + ' was created')
        return div.id;
    }

    listDivs() {
        if (this.divs.length === 0) {
            console.log('No divs to list');
        }
        this.divs.forEach(item => console.log(item.div.id));
    }

    removeByContent() {
        let content = prompt('Enter the content of the div you want to remove');
        let found = false;
        this.divs.forEach(item => {
            if (item.div.textContent === content) {
                console.log('div with ID: ' + item.div.id + ' & button with ID: "' + item.myButton.id + ' has been removed')
                item.div.remove();
                item.myButton.remove();
                item.resetButton.remove();
                this.divs = this.divs.filter(item => item.div.textContent !== content);
                found = true;
            }
            if (!found) {
                console.log('No divs with the content: ' + content);
            }
        });
    }

    highlightDivsByContent() {
        let content = prompt('Enter the content of the div you want to highlight').toLocaleLowerCase();
        let foundToHighlight = false;
        this.divs.forEach(item => {
            if (item.div.textContent.toLocaleLowerCase().includes(content)) {
                item.div.style.backgroundColor = 'yellow';
                foundToHighlight = true;
            }
        });
        if (!foundToHighlight) {
            console.log('No divs with the content: ' + content);
        }
    }

    removeByRange() {
        let start = prompt('Enter the start of the range');
        let end = prompt('Enter the end of the range');
        if (isNaN(start) || isNaN(end)) {
            console.log('Invalid input');
            return;
        }

        this.divs.forEach(item => {
            const idNumber = parseInt(item.div.id.split('-')[1]);
            if (idNumber >= start && idNumber <= end) {
                console.log('Removing div with ID: ' + item.div.id + ' & button with ID: ' + item.myButton.id);
                item.div.remove();
                item.myButton.remove();
                item.resetButton.remove();
            }
        });
        this.divs = this.divs.filter(item => {
            const idNumber = parseInt(item.div.id.split('-')[1]);
            return idNumber < start || idNumber > end;
            });
        }

    removeFirst() {
        if (this.divs.length > 0) {
            const element = this.divs[0];            
            console.log('div with ID: ' + element.div.id + ' (first) & button with ID: ' + element.myButton.id + ' removed');
            element.div.remove();
            element.myButton.remove();
            element.resetButton.remove();
            this.divs.shift();
        } else {
            console.log('No divs to remove');
        }
    }
    
    removeAllDivs() {
        if (this.divs.length > 0) {
            this.divs.forEach(item => {
                console.log('div with ID: ' + item.div.id + ' & button with ID: "' + item.myButton.id + ' has been removed')
                item.div.remove();
                item.myButton.remove();
                item.resetButton.remove();
            });
        this.divs = [];
        } else {
            console.log('No divs to remove');
        }
    }
}

function moveDiv(id, deltaX, deltaY) {
    const div = document.getElementById(id);

    // Step 1: Read the current position or default to 0
    let currentX = div.dataset.x ? parseInt(div.dataset.x) : 0;
    let currentY = div.dataset.y ? parseInt(div.dataset.y) : 0;

    // Step 2: Calculate new position
    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    // Step 3: Save the new position in data attributes
    div.dataset.x = newX;
    div.dataset.y = newY;

    // Step 4: Move the div with transform
    div.style.transform = `translateX(${newX}px) translateY(${newY}px)`;
}

const myManager = new DivManager();
const removeAllButton = document.createElement('button');
const removeFirstButton = document.createElement('button');
const addDivButton = document.createElement('button');
const list_of_Divs = document.createElement('button');
const removeByContent = document.createElement('button');
const removeByRange = document.createElement('button');
const highlightDivsByContent = document.createElement('button');
const moveleft = document.createElement('button');
const moveright = document.createElement('button');
const movedown = document.createElement('button');
const moveup = document.createElement('button');

const indiv = myManager.createDiv('My div');
const mydiv = document.getElementById(indiv);
mydiv.id = 'div-99';
mydiv.textContent = 'My div';
mydiv.style.position = 'absolute';
mydiv.style.fontSize = '5vh';
mydiv.style.left = '10vh';
mydiv.style.top = '10vh';
mydiv.style.backgroundColor = 'red';
mydiv.style.margin = '50px';
document.body.appendChild(mydiv);

removeAllButton.textContent = 'Remove all';
removeFirstButton.textContent = 'Remove first div';
addDivButton.textContent = 'Add div';
list_of_Divs.textContent = 'List divs to console';
removeByContent.textContent = 'Remove by content';
removeByRange.textContent = 'Remove by range';
highlightDivsByContent.textContent = 'Highlight by content';
moveleft.textContent = 'Move left';
moveright.textContent = 'Move right';
movedown.textContent = 'Move down';
moveup.textContent = 'Move up';

removeAllButton.addEventListener('click', () => myManager.removeAllDivs());
removeFirstButton.addEventListener('click', () => myManager.removeFirst());
addDivButton.addEventListener('click', () => myManager.createDiv("text"));
list_of_Divs.addEventListener('click', () => myManager.listDivs());
removeByContent.addEventListener('click', () => myManager.removeByContent());
removeByRange.addEventListener('click', () => myManager.removeByRange());
highlightDivsByContent.addEventListener('click', () => myManager.highlightDivsByContent());
moveleft.addEventListener('click', () => moveDiv('div-99', -50, 0));
moveright.addEventListener('click', () => moveDiv('div-99', 50, 0));
movedown.addEventListener('click', () => moveDiv('div-99', 0, 50));
moveup.addEventListener('click', () => moveDiv('div-99', 0, -50));

document.body.appendChild(removeAllButton);
document.body.appendChild(removeFirstButton);
document.body.appendChild(addDivButton);
document.body.appendChild(list_of_Divs);
document.body.appendChild(removeByContent);
document.body.appendChild(removeByRange);
document.body.appendChild(highlightDivsByContent);
document.body.appendChild(moveleft);
document.body.appendChild(moveright);
document.body.appendChild(movedown);
document.body.appendChild(moveup);

myManager.createDiv('First div');
myManager.createDiv('Second div');
myManager.createDiv('Third div');