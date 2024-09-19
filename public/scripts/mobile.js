const mobileHandular = document.querySelector('.mobile-menu_handular');
const mobileMenuElement = document.querySelector('.mobile-menu');


function toggleMobileMenu(){
    mobileMenuElement.classList.toggle('visible');
}


mobileHandular.addEventListener('click', toggleMobileMenu);