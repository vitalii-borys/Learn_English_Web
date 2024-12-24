const body = document.body;
const mybutton = document.getElementById('toggleColorMode');
mybutton.addEventListener('click', function() {
    if (body.classList.contains('lightmode')) {
        body.classList.remove('lightmode');
        body.classList.add('darkmode');
    } else {
        body.classList.remove('darkmode');
        body.classList.add('lightmode');
    }
});

const button2 = document.getElementById('borderToggle');
button2.addEventListener('click', function() {
    body.classList.toggle('hide-borders');
    button2.remove();
});

let hasFadedout = false;
let offset = 0;
let c = 0;
const enterButton = document.getElementById('entervalue');
enterButton.addEventListener('click', function fade() {
    c++;
    const movingtext = document.getElementById('movingtext');
    var inputChar = document.getElementById('inputchar');
    var connectedElement = document.getElementById('connectedinput');
    if (inputChar.value == 'e') {
        movingtext.style.fontSize = `${5-(0.5*c)}vh`;
        offset += 100;
        movingtext.style.transform = `translateY(${offset}px)`;
        if (!hasFadedout) {
            movingtext.style.opacity = '1';
            setTimeout(() => {
                movingtext.style.transition = 'opacity 20s ease-in-out, transform 1s ease-in-out, font-size 1s ease-in-out';
                movingtext.style.opacity = '0';
                hasFadedout = true;
            }, 500);
        }
        setTimeout(function() {
            movingtext.remove();
        }, 10000);
    } else {
        connectedElement.classList.add('shake');
        
        setTimeout(function() {
            connectedElement.classList.remove('shake');
        }, 500);
    }
});

class DivManager {
    constructor() {
        this.divCount = 0;
    }

    createDivWithButtons(content) {
        const container = document.createElement("div");
        container.classList.add("custom-container"); // Add class for style inheritance
        container.style.padding = "10px";
        
        const div = document.createElement("div");
        div.textContent = content;
        div.classList.add("custom-div"); // Add class for style inheritance
        
        const leftButton = document.createElement("button");
        leftButton.textContent = "←";
        const rightButton = document.createElement("button");
        rightButton.textContent = "→";
        const upButton = document.createElement("button");
        upButton.textContent = "↑";
        const downButton = document.createElement("button");
        downButton.textContent = "↓";

        leftButton.addEventListener("click", () => {
            const left = parseInt(container.style.left || "0");
            container.style.left = `${left - 10}px`;
        });
        rightButton.addEventListener("click", () => {
            const left = parseInt(container.style.left || "0");
            container.style.left = `${left + 10}px`;
        });
        upButton.addEventListener("click", () => {
            const top = parseInt(container.style.top || "0");
            container.style.top = `${top - 10}px`;
        });
        downButton.addEventListener("click", () => {
            const top = parseInt(container.style.top || "0");
            container.style.top = `${top + 10}px`;
        });
        
        container.appendChild(div);
        container.appendChild(upButton);
        container.appendChild(leftButton);
        container.appendChild(rightButton);
        container.appendChild(downButton);
        document.body.appendChild(container);

        setTimeout(() => {
            document.body.removeChild(container);
            console.log(`Removed div and its buttons: ${content}`);
        }, 4000);
    }
}

const manager = new DivManager();
const createButton = document.createElement("button");
createButton.textContent = "Create Div with Buttons";
createButton.addEventListener("click", () => manager.createDivWithButtons("self-indulgence"));
document.body.appendChild(createButton);
