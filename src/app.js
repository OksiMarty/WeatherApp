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
function showWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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
}

function search(city) {
  let key = "27218fb510ea3727370c3caaa80041fc";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input");
  search(inputCity.value);
}

search("Las Vegas");
let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

function searchCity(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let key = "27218fb510ea3727370c3caaa80041fc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleCurrentSubmit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}

let current = document.querySelector("#button-current");
current.addEventListener("click", handleCurrentSubmit);
