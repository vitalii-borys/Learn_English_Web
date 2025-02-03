let pageStatus = 'not signed in';

function toggleView(showClass, hideClass) {
    const hide = document.querySelectorAll(hideClass);
    hide.forEach((element) => {
    element.style.display = 'none';
})
    const show = document.querySelectorAll(showClass);
    show.forEach((element) => {
    element.style.display = 'block';
})
}

function createAuthButton(buttonTextContent, buttonClassName, classToShow, classToHide) {
    const signButton = document.createElement('button');
    signButton.textContent = buttonTextContent;
    signButton.className = buttonClassName;
    signButton.addEventListener('click', () => {toggleView(classToShow, classToHide);})
    document.body.appendChild(signButton);
}


function createInput(inputType, inputPlaceholder, inputClassName) {
    const input = document.createElement('input');
    input.type = inputType;
    input.placeholder = inputPlaceholder;
    input.className = inputClassName;
    document.body.appendChild(input);
}

createAuthButton('Sign in', 'sign-up', '.sign-in', '.sign-up');
createAuthButton('Sign up', 'sign-in', '.sign-up', '.sign-in');
createInput('email', 'Email', 'sign-in');
createInput('password', 'Password', 'sign-in');
createInput('email', 'Email', 'sign-up');
createInput('password', 'Password', 'sign-up');

if (pageStatus === 'not signed in') {
    // Set initial view to "Sign in"
    toggleView('.sign-in', '.sign-up');
}