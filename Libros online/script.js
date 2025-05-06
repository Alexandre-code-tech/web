// Modal de Bienvenida
window.onload = function() {
    document.getElementById('welcome-modal').style.display = 'flex';
    loadFavorites();
};

function closeModal() {
    document.getElementById('welcome-modal').style.display = 'none';
}

// Modo Claro/Oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Menú Hamburguesa
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Mostrar Secciones
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'favorites') {
        displayFavorites();
    }
}

// Carrusel
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth + 20;

function moveCarousel(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > items.length - 3) currentIndex = items.length - 3;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Cargar Libro
function loadBook(pdfUrl, title, author, description) {
    document.getElementById('book-title').textContent = title;
    document.getElementById('book-author').textContent = `Autor: ${author}`;
    document.getElementById('book-description').textContent = description;
    const pdfFrame = document.getElementById('pdf-frame');
    pdfFrame.src = pdfUrl;
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.href = pdfUrl = 'Libro1.pdf';
    downloadBtn.style.display = 'inline-block';
    showSection('home'); // Vuelve a la sección de inicio al cargar un libro
}

// Sistema de Favoritos
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function loadFavorites() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const title = btn.parentElement.querySelector('h3').textContent;
        if (favorites.includes(title)) {
            btn.classList.add('active');
        }
    });
}

function toggleFavorite(title, event) {
    event.stopPropagation();
    const btn = event.target;
    if (favorites.includes(title)) {
        favorites = favorites.filter(fav => fav !== title);
        btn.classList.remove('active');
    } else {
        favorites.push(title);
        btn.classList.add('active');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
    favorites.forEach(title => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card-grid');
        bookCard.innerHTML = `
            <h3>${title}</h3>
            <button class="favorite-btn active" onclick="toggleFavorite('${title}', event)"><i class="fas fa-heart"></i></button>
        `;
        favoritesList.appendChild(bookCard);
    });
}

// Sistema de Calificación
document.querySelectorAll('#rating-stars i').forEach(star => {
    star.addEventListener('click', () => {
        const value = star.dataset.value;
        const username = prompt('Por favor, ingresa tu nombre de usuario:');
        if (username) {
            alert(`Gracias, ${username}, por calificar con ${value} estrellas.`);
            // Aquí podrías guardar la calificación en localStorage o enviarla a un servidor
        }
    });
});

// Scroll y Botón Volver Arriba
window.onscroll = function() {
    const btn = document.querySelector('.back-to-top');
    btn.style.display = window.scrollY > 100 ? 'block' : 'none';
};
