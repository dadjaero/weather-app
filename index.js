function displayDate(now) {
  let week = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = week[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

/*function form(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let inputVal = document.querySelector("#city-name");
  input.innerHTML = inputVal.value;
}*/
/*function fDegree(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `138°F`;
}
function cDegree(event) {
  event.preventDefault();
  let ctemp = document.querySelector("#temp");
  ctemp.innerHTML = `59°C`;
}*/

function locationInfo(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  //console.log(response.data);
}

function form(event) {
  event.preventDefault();

  let inputVal = document.querySelector("#city-name").value;

  console.log(inputVal);
  search(inputVal);
}
function search(city) {
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(locationInfo);
}

function currentLocation(location) {
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(locationInfo);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let dateTime = document.querySelector("#day");
let correctDate = new Date();
dateTime.innerHTML = displayDate(correctDate);

let city = document.querySelector("#form");
city.addEventListener("submit", form);

let curr = document.querySelector("#button");
curr.addEventListener("click", currentPosition);

/*let temp = document.querySelector("#temp");
temp.addEventListener("click", fDegree);

let cTemp = document.querySelector("#temp");
cTemp.addEventListener("mouseover", cDegree);
*/
