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
    });