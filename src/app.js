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
}

let key = "27218fb510ea3727370c3caaa80041fc";
//let city = "Los Angeles";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=${key}&units=metric`;
axios.get(url).then(showWeather);
