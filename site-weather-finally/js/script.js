const api = {
    key: "c882b0f6a36922a1f07b646fc11a8131",
    base: "https://api.openweathermap.org/data/2.5/"
}

const temperatureUnit = '˚';
const humidityUnit = ' %';
const pressureUnit = ' мм. рт. ст.';
const windUnit = ' м/с';

let currentData;

//get city weather by select
const selectCity = document.querySelector('.search__byselect');
const cityName = ['Пекин', 'Лондон', 'Мадрид', 'Берлин', 'Москва', 'Киев', 'Минск', 'Лос-Анджелес', 'Рим', 'Варшава', 'Загреб', 'Абу-Даби'];

//rendering option in select
function searchBySelect() {
    for (let i = 0; i < cityName.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = cityName[i];
        option.value = cityName[i];
        selectCity.appendChild(option);
    }
}

searchBySelect(); //rendering option in select

selectCity.onchange = function () {
    getData(this.value);
}


// get city weather by pressing enter
const searchbox = document.querySelector('.search__box');
searchbox.addEventListener('keypress', setQuery);

document.querySelector('.search__btn').onclick = function () {
    getData(searchbox.value);
}

function setQuery(evt) {
    if (evt.keyCode == 13) {
        if (searchbox.value != '') getData(searchbox.value);
        else { showModal(); }
    }
}

//server request to get weather data
function getData(query) {
    fetch(`${api.base}forecast?q=${query}&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults)
        .catch(function () {
            console.log('error');
        })
}

//The function to which I pass the response from the server
function displayResults(weather) {
    console.log(weather);
    if (weather.cod == '404') { //Checking the correctness of the city entered by the user
        showModal();
    }
    else {
        currentData = weather;
        render(weather);
        periodicTasks();
    }
}

function convertPressure(value) {
    return (value / 1.33).toFixed();
}
//function to connect a weather value to a variable
function getValueWithUnit(value, unit) {
    return `${value}${unit}`;
}
//Get temperature
function getTemperature(value) {
    let roundedValue = (value - 273).toFixed();
    return getValueWithUnit(roundedValue, temperatureUnit);
}
//Method for rendering
function render(weather) {
    renderCity(weather);
    renderCurrentTemperature(weather);
    renderCurrentDescription(weather);

    renderForecast(weather);
    renderDetails(weather);
    renderDayOrNight(weather);
}

function renderCity(weather) {
    let cityName = document.querySelector('.current__city');
    cityName.innerHTML = weather.city.name;
}
//rendering current temperature
function renderCurrentTemperature(weather) {
    let tmp = weather.list[0].main.temp;

    let currentTmp = document.querySelector('.current__temperature');
    currentTmp.innerHTML = getTemperature(tmp);
}
//rendering current weather description
function renderCurrentDescription(weather) {
    let tmp = weather.list[0].weather[0].description;

    let description = document.querySelector('.current__description');
    description.innerHTML = tmp;
}
//rendering weather for 5 days
function renderForecast(weather) {
    let forecastDataContainer = document.querySelector('.forecast');
    let forecasts = '';

    for (let i = 5; i < 38; i = i + 8) {
        let item = weather.list[i];

        let icon = item.weather[0].icon;
        let temp = getTemperature(item.main.temp);
        let hours = getValueWithUnit(item.dt_txt[8], item.dt_txt[9]);

        let template = `<div class="forecast__item">
        <div class="forecast__time">${hours}</div>
        <div class="forecast__icon icon__${icon}"></div>
        <div class="forecast__temperature">${temp}</div>
      </div>`;
        forecasts += template;
    }
    forecastDataContainer.innerHTML = forecasts;
}
//rendering other weather indicators
function renderDetails(weather) {
    let item = weather.list[0];
    let pressureValue = convertPressure(item.main.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(item.main.humidity, humidityUnit);
    let feels_like = getTemperature(item.main.feels_like);
    let wind = getValueWithUnit(item.wind.speed, windUnit);

    renderDetailsItem('feelslike', feels_like);
    renderDetailsItem('humidity', humidity);
    renderDetailsItem('pressure', pressure);
    renderDetailsItem('wind', wind);
}
//Add details to class
function renderDetailsItem(className, value) {
    let container = document.querySelector(`.${className}`).querySelector('.details__value');
    container.innerHTML = value;
}
//define day or night
function isDay(weather) {
    let sunrise = weather.city.sunrise * 1000;
    let sunset = weather.city.sunset * 1000;

    let now = Date.now();
    return (now > sunrise && now < sunset);
}
//define attribute for the root tag(html)
function renderDayOrNight(weather) {
    let attrName = isDay(weather) ? 'day' : 'night';
    transition();
    document.documentElement.setAttribute('data-theme', attrName);
    document.querySelectorAll('.search__byselect option').forEach(function (elem) { //change background options to night 
        if (attrName == 'night') {
            elem.classList.add('night');
        }
        else {
            elem.classList.remove('night');
        }
    })

    document.querySelectorAll('.modal__wrapper').forEach(function (elem) { //change background modal to night 
        if (attrName == 'night') {
            elem.classList.add('night');
        }
        else {
            elem.classList.remove('night');
        }
    })
}

function periodicTasks() {
    setInterval(displayResults, 6000000);
    setInterval(function () {
        console.log(currentData);
        renderDayOrNight(currentData);
    }, 60000);
}

//smooth background change
function transition() {
    document.documentElement.classList.add('transition');
    setTimeout(function () {
        document.documentElement.classList.remove('transition');
    }, 4000)
}

//modal window on unsuccessful attempt input city name
document.querySelectorAll('.close__btn').forEach(function (elem) {
    elem.onclick = closeModal;
})

//close window by pass on the gray area
document.querySelectorAll('.modal').forEach(function (elem) {
    elem.onclick = closeModal;
})

//close window
function closeModal() {
    document.querySelectorAll('.modal').forEach(function (elem) {
        elem.classList.add('hide');
    })
    document.onkeydown = null;
    searchbox.removeAttribute('readonly', 'readonly');
}

//show window
function showModal() {
    document.querySelectorAll('.modal').forEach(function (elem) {
        elem.classList.remove('hide');
        document.onkeydown = function (event) {
            //close window on pass Esc
            if (event.keyCode == 27) closeModal();
        }
        searchbox.setAttribute('readonly', 'readonly');//add an attribute when opening a modal window so that it is read-only
    })
}

//disable event on the window
document.querySelector('.modal__wrapper').onclick = function (event) {
    event.stopPropagation();
}












