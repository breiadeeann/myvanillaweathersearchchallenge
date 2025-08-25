function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#weather-app-description");
  let humidityElement = document.querySelector("#weather-app-humidity");
  let windElement = document.querySelector("#weather-app-wind");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#weather-app-time");
  let temperatureIconElement = document.querySelector(
    "#weather-app-temperature-icon"
  );

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}kh/h`;
  timeElement.innerHTML = formatDate(date);
  temperatureIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-temperature-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3063b23035d47odf96b70c05f0bta423";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function citySearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchInput);

searchCity("Singapore");
