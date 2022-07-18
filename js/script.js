
//close cookie block
const closeCoockie = document.querySelector('.first-content-coockie_btn');
const cookieBlock = document.querySelector('.first-content-coockie');
    closeCoockie.addEventListener('click', () => {
        cookieBlock.classList.add('active');
});