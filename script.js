document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.getElementById('input-box');
    const searchButton = document.getElementById('submit-button');
    const temperature = document.getElementById('temperature');
    const temperature_description = document.getElementById('temperature-description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind-speed');

    async function checkWeather(city) {
        const apiKey = "7df6bab00bc260ac254548fde15f097b";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        console.log("URL:", url);

        try {
            const response = await fetch(url);
            const weatherData = await response.json();

            if (response.ok) {
                temperature.textContent = (weatherData.main.temp - 273.15).toFixed(2) + " \u00B0C";
                temperature_description.textContent = weatherData.weather[0].description;
                humidity.textContent = weatherData.main.humidity + " %";
                wind_speed.textContent = (weatherData.wind.speed * 3.6).toFixed(2) + " km/h";
            } else {
                throw new Error('City not found');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('City not found. Please enter a valid city name.');
        }
    }

    searchButton.addEventListener('click', () => {
        const city = inputBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            console.error("Please enter a city name");
        }
    });
});