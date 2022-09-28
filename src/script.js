let apiKey = "f3009e4852fa0a079dab291dabf020c4";

let now = new Date();
let currentTime = document.querySelector("#date-time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;

function weatherCity(event) {
  event.preventDefault();

  let cityName = document.querySelector(".name-city");
  let inputCityName = document.querySelector("#input_city_name");
  cityName.innerHTML = `${inputCityName.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureInputLocation);
}

document.querySelector("#searchbutton").addEventListener("click", weatherCity);

let isCelcius = true;
let temperature = document.querySelector("#current_temp");

function toFarenheit(event) {
  event.preventDefault();

  if (isCelcius) {
    temperature.innerHTML = `${Math.round(temperature.innerHTML * 1.8 + 32)}`;
    isCelcius = false;
  }
}

function toCelcius(event) {
  event.preventDefault();

  if (isCelcius === false) {
    temperature.innerHTML = `${Math.round(
      (temperature.innerHTML - 32) * 0.5556
    )}`;
    isCelcius = true;
  }
}

document
  .querySelector("#tempFahrenheit")
  .addEventListener("click", toFarenheit);

document.querySelector("#tempCelsius").addEventListener("click", toCelcius);

function showTemperatureInputLocation(response) {
  let temperatureShow = document.querySelector("#current_temp");
  temperatureShow.innerHTML = `${Math.round(response.data.main.temp)}`;

  let minTemperatureShow = document.querySelector("#min_temp_today");
  minTemperatureShow.innerHTML = `${Math.round(response.data.main.temp_min)}`;

  let maxTemperatureShow = document.querySelector("#max_temp_today");
  maxTemperatureShow.innerHTML = `${Math.round(response.data.main.temp_max)}`;

  let humidityShow = document.querySelector("#humidity");
  humidityShow.innerHTML = `${response.data.main.humidity}`;

  let weatherDescriptionShow = document.querySelector(".weather_description");
  weatherDescriptionShow.innerHTML = `${response.data.weather[0].description}`;

  let iconShow = document.querySelector(".card-img-top");
  iconShow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconShow.setAttribute("alt", response.data.weather[0].description);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrentLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrentLocation).then(showTemperatureInputLocation);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let buttonCurrentLocation = document.querySelector("#location_search");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);
