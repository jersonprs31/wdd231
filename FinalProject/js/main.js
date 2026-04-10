import { fetchData } from './api.js';

const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('primary-nav');
const dataContainer = document.getElementById('data-container');
const modal = document.getElementById('info-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

const visits = localStorage.getItem('visitCount') || 0;
const newVisitCount = parseInt(visits) + 1;
localStorage.setItem('visitCount', newVisitCount);

const visitDisplay = document.getElementById('visit-counter');
if (visitDisplay) {
    visitDisplay.textContent = `Page visits: ${newVisitCount}`;
}

async function init() {
    if (!dataContainer) return;

    try {
        const items = await fetchData('data/data.json');
        
        const htmlContent = items.map(item => `
            <div class="card">
                <h2>${item.name}</h2>
                <p><strong>Origin:</strong> ${item.origin}</p>
                <p><strong>Roast:</strong> ${item.roast}</p>
                <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                <button class="view-details" data-id="${item.id}">View Details</button>
            </div>
        `).join('');

        dataContainer.innerHTML = htmlContent;

        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                openModal(id, items);
            });
        });

    } catch (error) {
        dataContainer.innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

function openModal(id, items) {
    const selectedItem = items.find(item => item.id == id);
    if (selectedItem) {
        modalTitle.textContent = selectedItem.name;
        modalDesc.textContent = selectedItem.description;
        modal.showModal();
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
}

init();

const resultsContainer = document.getElementById('results');
if (resultsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('fname')) {
        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${urlParams.get('fname')}</p>
            <p><strong>Email:</strong> ${urlParams.get('email')}</p>
            <p><strong>Favorite Roast:</strong> ${urlParams.get('preference')}</p>
        `;
    } else {
        resultsContainer.innerHTML = `<p>No form data found.</p>`;
    }
}