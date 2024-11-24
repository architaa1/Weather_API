const apiKey = 'fcee7889895c257e4eb441a8cc815eff';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your API key.');
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Failed to fetch weather data:', error.message);
        alert('Failed to fetch weather data. ' + error.message);
    }
}

function displayWeather(data) {
    const { main: { temp, humidity }, wind: { speed }, sys: { country }, name, weather } = data;
    const [{ main: weatherMain, description, icon }] = weather;

    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    `;
    weatherDisplay.innerHTML = weatherHTML;
}
