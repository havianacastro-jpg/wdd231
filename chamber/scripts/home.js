const apiKey = "421105be28318751b83ab6de8b983102";
const lat = "19.4326";
const lon = "-99.1332";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=\({lat}&lon=\){lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=\({lat}&lon=\){lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherDesc = document.querySelector('#weather-desc');
    const weatherIcon = document.querySelector('#weather-icon');

    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    const desc = data.weather[0].description;
    weatherDesc.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    const forecastList = document.querySelector('#forecast-list');
    forecastList.innerHTML = '';

    const middayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    middayForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `**${formattedDate}:** \({Math.round(day.main.temp)}°C,\){day.weather[0].description}`;
        forecastList.appendChild(listItem);
    });
}

const membersUrl = 'data/members.json';

async function getMembersData() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.querySelector('#spotlights');
    spotlightsContainer.innerHTML = '';

    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver" || member.membershipLevel === 2 || member.membershipLevel === 3
    );

    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `