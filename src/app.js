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
}

let key = "27218fb510ea3727370c3caaa80041fc";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${key}&units=metric`;
axios.get(url).then(showWeather);
