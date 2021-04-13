// переменные для данных 
const outCity = document.querySelector('.out__city');
const outCountry = document.querySelector('.out__country');

const outTemp = document.querySelector('.out__temp');
const outTempF = document.querySelector('.out__temp-f');

const outFeels = document.querySelector('.out__feels');
const outHumidity = document.querySelector('.out__humidity');
const outPressure = document.querySelector('.out__pressure');
const outWind = document.querySelector('.out__wind');
const outDescription = document.querySelector('.out__description');
const outSunrise = document.querySelector('.out__sunrise');
const outSunset = document.querySelector('.out__sunset');
const outVisibility = document.querySelector('.out__visibility');

const outIcon = document.querySelector('.out__icon');
console.log(outIcon);


// выносим параметры в отдельный объект 
const param = {
    'url': "https://api.openweathermap.org/data/2.5/",
    'appid': '3c34a8967301fd05495c27aa5c4fa999'
}

function getWeather() {
    const cityId = document.querySelector('#city').value; // получаем город по id из select
    fetch(`${param.url}weather?id=${cityId}&appid=${param.appid}`)
        .then(weather => {
            return weather.json();
        })
        .then(showWeather); // показываем полученную погоды 
}

// функция вывода на страницу 
function showWeather(data) {

    //блок для перевода Sunrise  
    let unixSunrise = (data.sys.sunrise);
    let newSunrise = new Date(unixSunrise * 1000);
    let hoursSunrise = newSunrise.getHours();
    let minutesSunrise = '0' + newSunrise.getMinutes();
    let formatSunrise = `${hoursSunrise}:${minutesSunrise.substr(-2)}`;

    //блок для перевода Sunset 
    let unixSunset = (data.sys.sunset);
    let newSunset = new Date(unixSunset * 1000);
    let hoursSunset = newSunset.getHours();
    let minutesSunset = '0' + newSunset.getMinutes();
    let formatSunset = `${hoursSunset}:${minutesSunset.substr(-2)}`;

    // Timezone
    let timezone = (data.timezone);
    timezone = new Date(new Date().getTime()) - 25200 * 1000;


    // ВЫВОД на страницу 
    outCity.innerHTML = (data.name);
    outCountry.innerHTML = (data.sys.country);
    outTemp.innerHTML = Math.floor(data.main.temp - 273) + ' &degС';
    outTempF.innerHTML = Math.round((Math.floor(data.main.temp - 273) * 1.8) + 32) + ' &degF'; // фаренгейты 

    outFeels.innerHTML = Math.floor(data.main.feels_like - 273) + ' &degС';
    outHumidity.innerHTML = (data.main.humidity) + ' %';
    outPressure.innerHTML = Math.floor((data.main.pressure) / 1.33) + ' mmHg';
    outWind.innerHTML = (data.wind.speed) + ' m/s';
    outDescription.textContent = (data.weather[0]['description']);
    outSunrise.innerHTML = formatSunrise;
    outSunset.innerHTML = formatSunset;
    outVisibility.textContent = (data.visibility) + ' Meters';

    //http://openweathermap.org/img/wn/10d@2x.png   
    //https://openweathermap.org/img/wn/
    outIcon.innerHTML = `<img src='https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png'>`;

    console.log(data);
    console.log(data.weather[0]['icon']);
}

getWeather();
document.querySelector('#city').onchange = getWeather;