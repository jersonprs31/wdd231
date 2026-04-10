import { fetchData } from './api.js';

const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('primary-nav');
const dataContainer = document.getElementById('data-container');
const modal = document.getElementById('info-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalIngredients = document.getElementById('modal-ingredients');

// Responsive Menu
hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Local Storage for Page Visits
const visits = localStorage.getItem('visitCount') || 0;
const newVisitCount = parseInt(visits) + 1;
localStorage.setItem('visitCount', newVisitCount);

const visitDisplay = document.getElementById('visit-counter');
if (visitDisplay) {
    visitDisplay.innerHTML = `<em>Visits to our directory: ${newVisitCount}</em><br><br>`;
}

// Fetch and Display Data
async function init() {
    if (!dataContainer) return;

    try {
        const items = await fetchData('data/data.json');
        
        const htmlContent = items.map(item => `
            <div class="card">
                <h2>${item.name}</h2>
                <span class="tag">${item.category}</span>
                <p><strong>Region:</strong> ${item.region}</p>
                <p><strong>Overview:</strong> ${item.description.substring(0, 50)}...</p>
                <button class="view-details" data-id="${item.id}">View Recipe Info</button>
            </div>
        `).join('');

        dataContainer.innerHTML = htmlContent;

        // Modal Event Listeners
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                openModal(id, items);
            });
        });

    } catch (error) {
        dataContainer.innerHTML = `<p>Failed to load culinary data. Please try again later.</p>`;
    }
}

function openModal(id, items) {
    const selectedItem = items.find(item => item.id == id);
    if (selectedItem) {
        modalTitle.textContent = selectedItem.name;
        modalDesc.textContent = selectedItem.description;
        if(modalIngredients) {
             modalIngredients.innerHTML = `<strong>Traditional Ingredients:</strong> ${selectedItem.ingredients}`;
        }
        modal.showModal();
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
}

init();

// Form Action Page Logic
const resultsContainer = document.getElementById('results');
if (resultsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('fname')) {
        resultsContainer.innerHTML = `
            <p><strong>Name:</strong> ${urlParams.get('fname')}</p>
            <p><strong>Email:</strong> ${urlParams.get('email')}</p>
            <p><strong>Favorite Antojito:</strong> ${urlParams.get('favorite')}</p>
        `;
    } else {
        resultsContainer.innerHTML = `<p>No form data found.</p>`;
    }
}