
let currentDate = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[currentDate.getDay()];
let currentHours = currentDate.getHours();
if (currentHours < 10) {
    currentHours = `0${currentHours}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
}

let currentTime = document.querySelector("#currentDate");
currentTime.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}  `;

function changeCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let h1 = document.querySelector("h1");
    if (cityInput.value) {
        //h1.innerHTML = `${cityInput.value}`;
        h1.innerHTML = `${cityInput.value}`[0].toUpperCase() + `${cityInput.value}`.slice(1);
        let apiUrlCitySearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=de2ebf2c340b35b80bea446a7df3ad64&units=metric`;
        axios.get(apiUrlCitySearch).then(showForcast);
    }
    else {
        h1.innerHTML = null;
        alert("Please, type a city");
    }
}
let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", changeCity);

function showForcast(response) {
    console.log(response);
    let weatherDescription = document.querySelector('#weatherDescription');
    weatherDescription.innerHTML = response.data.weather[0].main;
    let tempContainer = document.querySelector('#tempValue');
    let temp = Math.round(response.data.main.temp);
    tempContainer.innerText = temp;
    let precipitation = document.querySelector('#precipitationValue');
    precipitation.innerHTML = response.data.clouds.all;
    let humidity = document.querySelector('#humidityValue');
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector('#windSpeedValue');
    windSpeed.innerHTML = response.data.wind.speed;
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
}
function getCurrentPosition(position) {
    console.log(position);
    let currentLat = position.coords.latitude;
    let currentLong = position.coords.longitude;

    const apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&units=metric&appid=de2ebf2c340b35b80bea446a7df3ad64`;
    axios.get(apiUrlLocation).then(showForcast);
    //.then(changeCityLocation);
}
function changeGeoLocation(_event_) {
    navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let currentLocation = document.querySelector("#current-location-btn");
currentLocation.addEventListener("click", changeGeoLocation);

