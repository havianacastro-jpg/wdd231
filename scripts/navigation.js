const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});