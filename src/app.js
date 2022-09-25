function formatDate(time) {
  let date = new Date(time);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayofweek = day[date.getDay()];
  let month = [
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
  let monthofyear = month[date.getMonth()];
  let year = date.getFullYear();
  return `${hours}:${minutes} ${dayofweek} ${monthofyear} ${year}`;
}

function newIcon(icon) {
  if (icon === "01d") {
    return `src/icons/clear sky.png`;
  } else if (icon === "02d") {
    return `src/icons/few clouds.png`;
  } else if (icon === "03d") {
    return `src/icons/scattered clouds.png`;
  } else if (icon === "04d" || icon === "04n") {
    return `src/icons/broken clouds.png`;
  } else if (icon === "09d" || icon === "09n") {
    return `src/icons/shower rain.png`;
  } else if (icon === "10d" || icon === "10n") {
    return `src/icons/rain.png`;
  } else if (icon === "11d" || icon === "11n") {
    return `src/icons/thunderstorm.png`;
  } else if (icon === "13d" || icon === "13n") {
    return `src/icons/snow.png`;
  } else if (icon === "50d" || icon === "50n") {
    return `src/icons/mist.png`;
  } else if (icon === "01n") {
    return `src/icons/clear sky night.png`;
  } else if (icon === "02n") {
    return `src/icons/few clouds night.png`;
  } else if (icon === "03n") {
    return `src/icons/scattered clouds night.png`;
  }
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayofweek = day[date.getDay()];
  return dayofweek;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let dayForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col-2">
                <div class="forecast-day">${formatForecastDay(
                  forecastDay.dt
                )}</div>
              
                <img src= '${newIcon(forecastDay.weather[0].icon)}'
                   class="forecast-image" width = 60 height = 60 alt="clear" id="forecast-image"/>
          
                   <div class="forecast-temp">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="forecast-temp-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
             </div>
             </div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  dayForecast.innerHTML = forecastHTML;
}

function showForecast(coordinates) {
  let key = "40b745c14eadad7b7c4e6e4bf3b70103";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  celsius = response.data.main.temp;
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(celsius);
  document.querySelector("#main-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#main-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#main-image")
    .setAttribute("src", newIcon(response.data.weather[0].icon));
  document
    .querySelector("#main-image")
    .setAttribute("alt", response.data.weather[0].description);
  showForecast(response.data.coord);
}

function search(city) {
  let key = "40b745c14eadad7b7c4e6e4bf3b70103";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input");
  search(inputCity.value);
}

function searchCity(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let key = "40b745c14eadad7b7c4e6e4bf3b70103";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleCurrentSubmit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}

let current = document.querySelector("#button-current");
current.addEventListener("click", handleCurrentSubmit);

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

search("Las Vegas");
