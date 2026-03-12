const currentYearSpan = document.getElementById('currentyear');
const lastModifiedSpan = document.getElementById('lastModified');

currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    if (primaryNav.classList.contains('open')) {
        menuBtn.innerHTML = '&#10006;';
    } else {
        menuBtn.innerHTML = '&#9776;';
    }
});

const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const membersURL = 'data/members.json';

async function getMembersData() {
    try {
        const response = await fetch(membersURL);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        
        const logo = document.createElement('img');
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `${member.name} logo`);
        logo.setAttribute('loading', 'lazy');
        
        const name = document.createElement('h3');
        name.textContent = member.name;
        
        const address = document.createElement('p');
        address.textContent = member.address;
        
        const phone = document.createElement('p');
        phone.textContent = member.phone;
        
        const websiteLink = document.createElement('a');
        websiteLink.setAttribute('href', member.website);
        websiteLink.setAttribute('target', '_blank');
        websiteLink.textContent = member.website;
        
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(websiteLink);
        
        membersContainer.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
});

getMembersData();