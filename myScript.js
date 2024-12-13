const body = document.body;
const button = document.getElementById('toggleColorMode');
button.addEventListener('click', function() {
    if (body.classList.contains('lightmode')) {
        body.classList.remove('lightmode');
        body.classList.add('darkmode');
    } else {
            body.classList.remove('darkmode');
            body.classList.add('lightmode');
        }
    }
);

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