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