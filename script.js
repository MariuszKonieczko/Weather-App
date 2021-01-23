window.onload = function () {
  const form = document.getElementById('form');
  const search = document.getElementById('search');
  getWeatherLocation('Rzeszów');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    if (location) {
      getWeatherLocation(location);
      search.value = '';
    }
  });
};

const apikey = '3265874a2c77ae4a04bb96236a642d2f';

const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

async function getWeatherLocation(location) {
  const response = await fetch(url(location));

  if (response.ok) {
    const responseData = await response.json();
    addWeatherToPage(responseData);
  } else {
    const main = document.getElementById('main');
    const error = document.createElement('div');
    error.innerHTML = `<h2>Error: ${response.status} ${response.statusText} - no "${location}" in data</h2>`;
    main.innerHTML = '';
    main.appendChild(error);
  }
}

function getLocat() {}

function KtoC(F) {
  return Math.ceil(F - 273.15);
}

function addWeatherToPage(data) {
  const main = document.getElementById('main');
  const temp = KtoC(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');
  weather.innerHTML = `

  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <small>${data.weather[0].main}</small>
  <p>in ${data.name}<p>`;

  main.innerHTML = '';

  main.appendChild(weather);
}
