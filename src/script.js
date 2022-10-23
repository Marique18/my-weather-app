//let apiKey = "f3009e4852fa0a079dab291dabf020c4";
let apiKey = "2b6fdad0cbd018949c50c70f72250726";

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
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forcast-prediction");
  let forecastHTML = `<div class="col">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div
          class="col forcast-five-days"
        >
          <div class="card" style="width: 18rem">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="row">
                  <div class="col forcast-icon">
                    <img
                      class="icon"
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt="weather icon"
                      height="80"
                      width="80"
                    />
                    <div class="col forcast-day-and-temp">
                      ${formatDay(forecastDay.dt)}
                      <br />
                      <div class="forecast-temperature">
                      <span class="forecast-temperature-min"> ${Math.round(
                        forecastDay.temp.min
                      )}°C</span>
                      |  <span class="forecast-temperature-max">${Math.round(
                        forecastDay.temp.max
                      )}°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
                </ul>
          </div>
        </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  let windspeedShow = document.querySelector("#windspeed");
  windspeedShow.innerHTML = `${Math.round(response.data.wind.speed)}`;

  getForecast(response.data.coord);
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

displayForecast();
