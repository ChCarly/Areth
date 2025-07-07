const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown');

function updateToggleIcon(isOpen) {
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
    updateToggleIcon(isOpen);
};

const dropdownLinks = document.querySelectorAll('.dropdown a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        dropDownMenu.classList.remove('open');
        updateToggleIcon(false);
    });
});

// --- SECTION OBSERVER ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header .navbar a');

function removeActiveClass() {
    navLinks.forEach(link => link.classList.remove('active'));
    dropdownLinks.forEach(link => link.classList.remove('active'));
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

sections.forEach(section => observer.observe(section));

// --- CLICK FUORI DAL MENU ---
document.addEventListener('click', function (event) {
    if (!dropDownMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
        dropDownMenu.classList.remove('open');
        updateToggleIcon(false);
    }
});

dropDownMenu.addEventListener('click', function (event) {
    event.stopPropagation();
});

// --- SWIPER ---
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

// --- DOMContentLoaded per COOKIE + MODALE ---
document.addEventListener("DOMContentLoaded", function () {
    // --- MODALE FULLSCREEN ---
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc'); // aggiunto
    const closeBtn = document.querySelector('.img-modal .close');

    document.querySelectorAll('.swiper-slide img').forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalDesc.textContent = this.getAttribute('data-desc') || ""; // mostra descrizione
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- COOKIE BANNER ---
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (banner && acceptBtn) {
        banner.classList.remove('hidden'); // Mostra sempre il banner

        acceptBtn.addEventListener('click', function () {
            banner.classList.add('hidden');
        });
    }
});