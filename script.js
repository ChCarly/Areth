// Seleziona elementi DOM
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown');

// Funzione per aggiornare l'icona del toggle button
function updateToggleIcon(isOpen) {
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

// Gestisci il click sul toggle button
toggleBtn.onclick = function() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
    updateToggleIcon(isOpen);
};

// Gestisci il click sui link del menu a discesa
const dropdownLinks = document.querySelectorAll('.dropdown a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        dropDownMenu.classList.remove('open');
        updateToggleIcon(false);
    });
});

// Crea un osservatore per monitorare la visibilità delle sezioni
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header .navbar a');

function removeActiveClass() {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    dropdownLinks.forEach(link => {
        link.classList.remove('active');
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            removeActiveClass();
            document.querySelector(`header .navbar a[href='#${id}']`)?.classList.add('active');
            document.querySelector(`.dropdown a[href='#${id}']`)?.classList.add('active');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    observer.observe(section);
});

// Chiudi il menu a discesa quando si clicca fuori dal menu
document.addEventListener('click', function(event) {
    if (!dropDownMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
        dropDownMenu.classList.remove('open');
        updateToggleIcon(false);
    }
});

// Impedisce la propagazione dell'evento di clic all'interno del menu
dropDownMenu.addEventListener('click', function(event) {
    event.stopPropagation();
});

// Slider
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        banner.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.classList.add('hidden');
    });
});