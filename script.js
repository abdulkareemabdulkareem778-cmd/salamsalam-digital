// mobile menu
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', ()=> nav.classList.toggle('show'));

// fill year
document.getElementById('year').textContent = new Date().getFullYear();
