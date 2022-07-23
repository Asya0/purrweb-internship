
//close cookie block
const closeCoockie = document.querySelector('.coockie_btn');
const cookieBlock = document.querySelector('.coockies');
closeCoockie.addEventListener('click', (e) => {
    e.preventDefault();
    cookieBlock.classList.remove('active');
    localStorage.setItem('coockies', 1);
});
window.addEventListener("load", function(event) {
    if(!localStorage.getItem('coockies')) {
        cookieBlock.classList.add('active');
    }
});

// form validation
const form = document.querySelector('.contact-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input_email');

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

form.onsubmit = function () {
    let emailValue = inputEmail.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');
    formInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');
            // console.log('empty string');
        } else {
            input.classList.remove('error');
        }
    });

    if (emptyInputs.length !== 0) {
        console.log('string not empty');
        return false;
    }

    if (!validateEmail(emailValue)) {
        console.log('email not valid');
        inputEmail.classList.add('error');
        return false;
    } else {
        inputEmail.classList.remove('error');
    }

    // console.log('ok');

}