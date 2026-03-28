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

const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const membersURL = 'data/members.json';

const membersContainer = document.getElementById('members-container');
if (membersContainer) {
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');

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
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
            `;
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
}

const spotlightsContainer = document.getElementById('spotlights-container');
if (spotlightsContainer) {
    
    async function getSpotlights() {
        try {
            const response = await fetch(membersURL);
            const data = await response.json();
            
            const qualifiedMembers = data.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
            
            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
            
            const selectedMembers = shuffled.slice(0, 3);
            
            displaySpotlights(selectedMembers);
        } catch (error) {
            console.error('Error fetching spotlights:', error);
        }
    }

    function displaySpotlights(members) {
        spotlightsContainer.innerHTML = '';
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            
            const levelText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
            
            card.innerHTML = `
                <h4>${member.name}</h4>
                <img src="${member.image}" alt="${member.name} Logo" width="100" loading="lazy">
                <p><strong>${levelText}</strong></p>
                <hr>
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <a href="${member.website}" target="_blank">Website</a>
            `;
            spotlightsContainer.appendChild(card);
        });
    }

    getSpotlights();

    const apiKey = '15a759ca35f46c36ea8c73e29a404057'; 
    const lat = 14.5269; 
    const lon = -90.5875;
    
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function fetchWeather() {
        try {
            const weatherResponse = await fetch(weatherURL);
            if (weatherResponse.ok) {
                const weatherData = await weatherResponse.json();
                document.getElementById('current-temp').textContent = Math.round(weatherData.main.temp);
                document.getElementById('weather-desc').textContent = weatherData.weather[0].description;
                document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            }

            const forecastResponse = await fetch(forecastURL);
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                const forecastContainer = document.getElementById('forecast-container');
                forecastContainer.innerHTML = '';
                
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                let daysCount = 0;

                forecastData.list.forEach(forecast => {
                    if (forecast.dt_txt.includes("12:00:00") && daysCount < 3) {
                        const date = new Date(forecast.dt_txt);
                        const dayName = daysOfWeek[date.getDay()];
                        const temp = Math.round(forecast.main.temp);
                        
                        forecastContainer.innerHTML += `<p><strong>${dayName}:</strong> ${temp}&deg;C</p>`;
                        daysCount++;
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    fetchWeather();
}

const currentUrl = window.location.href;
if (currentUrl.includes('thankyou.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    
    const showFirst = document.getElementById('showFirst');
    const showLast = document.getElementById('showLast');
    const showEmail = document.getElementById('showEmail');
    const showPhone = document.getElementById('showPhone');
    const showBusiness = document.getElementById('showBusiness');
    const showDate = document.getElementById('showDate');

    if (showFirst) showFirst.textContent = urlParams.get('fname');
    if (showLast) showLast.textContent = urlParams.get('lname');
    if (showEmail) showEmail.textContent = urlParams.get('email');
    if (showPhone) showPhone.textContent = urlParams.get('phone');
    if (showBusiness) showBusiness.textContent = urlParams.get('bizname');
    
    if (showDate) {
        const rawDate = urlParams.get('timestamp');
        if (rawDate) {
            const formattedDate = new Date(rawDate).toLocaleString();
            showDate.textContent = formattedDate;
        }
    }
}

const modals = [
    { btnId: 'btn-np', dialogId: 'dialog-np' },
    { btnId: 'btn-bronze', dialogId: 'dialog-bronze' },
    { btnId: 'btn-silver', dialogId: 'dialog-silver' },
    { btnId: 'btn-gold', dialogId: 'dialog-gold' }
];

modals.forEach(modal => {
    const btn = document.getElementById(modal.btnId);
    const dialog = document.getElementById(modal.dialogId);
    
    if (btn && dialog) {
        btn.addEventListener('click', () => {
            dialog.showModal();
        });
    }
});

const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});