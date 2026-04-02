import { places } from '../data/places.mjs';

const container = document.getElementById('discover-container');

places.forEach((place, index) => {
    const card = document.createElement('article');
    card.className = 'discover-card';
    card.style.gridArea = `card${index + 1}`;
    
    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;
    
    container.appendChild(card);
});

const visitMessage = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDiff = now - parseInt(lastVisit);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysDiff} days ago.`;
    }
}

localStorage.setItem('lastVisit', now.toString());