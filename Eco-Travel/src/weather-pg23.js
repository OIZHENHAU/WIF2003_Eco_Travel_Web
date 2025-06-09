const menuMain = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menuMain.classList.add("display"); 
});

closeBtn.addEventListener("click", () => {
    menuMain.classList.remove("display"); 
})


let cityInput = document.getElementById("city-input"),
searchBtn = document.getElementById("searchBtn"),
locationBtn = document.getElementById("locationBtn");
api_key = 'adfde7f70ac51bba3ed8f00fc9baf9ed',
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
sevenDaysForecastCard = document.querySelector('.day-forecast');
apiCard = document.querySelectorAll('.highlights .card')[0];
sunriseCard = document.querySelectorAll('.highlights .card')[1];
humidityVal = document.getElementById('humidityVal');
pressureVal = document.getElementById('pressureVal');
visibilityVal = document.getElementById('visibilityVal');
windSpeedVal = document.getElementById('windSpeedVal');
hourlyForecastCard = document.querySelector('.hourly-forecast');
apiList= ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];


document.addEventListener("DOMContentLoaded", () => {
    getUserCoordinates(); // Auto call when the page is fully loaded
});


function getWeatherDetails(name, lat, lon, country, state) {
    /*console.log("Method Name: " + name);
    console.log("Method Lat: " + lat);
    console.log("Method Lon: " + lon);
    console.log("Method Country: " + country);
    console.log("Method State: " + state);
    */
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
        'Sunday', 
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
        console.log(data);
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        apiCard.innerHTML = `
            <div class="card-head">
                  <p class="icon-text"><i class="fa-regular fa-wind fa-3x wind-icon"></i><span>Air Quality Index</span></p>
                  <p class="air-index aqi-1">${apiList[data.list[0].main.aqi - 1]}</p>
                </div>


                <div class="air-list">
                  <div class="air-item">
                      <p>CO2</p>
                      <p class ="air-item-text">${co}</p>
                  </div>

                  <div class="air-item">
                    <p>O2</p>
                    <p class ="air-item-text">${o3}</p>
                    </div>

                  <div class="air-item">
                    <p>NO2</p>
                    <p class ="air-item-text">${no2}</p>
                  </div>

                  <div class="air-item">
                    <p>NH3</p>
                    <p class ="air-item-text">${nh3}</p>
                  </div>

                </div>
        `;

    }).catch(() => {
        alert(`Failed to fetch Air Quality Index`);

    });


    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                  <p class="icon-text"><i class="fa-light fa-location-dot google-location-icon"></i>${name}, ${country}</p>
                  <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                  <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
              </div>
              <hr>
              <div class="card-footer">
                <p class="icon-text"><i class="fa-light fa-calendar calendar-icon"></i>${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
              </div>
        `;

        let {sunrise, sunset} = data.sys,
        {timezone, visibility} = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind,
        sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A');
        sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');

        sunriseCard.innerHTML = `
            <div class="card-head">
                  <p class="icon-text">Sunrise & Sunset</p>
                </div>

                <div class="sunrise-sunset">
                  <div class="item">
                    <div class="icon-sunrise">
                      <i class="fa-light fa-sunrise fa-4x"></i>
                    </div>
                    <div>
                      <p>Sunrise</p>
                      <h2>${sRiseTime}</h2>
                    </div>
                  </div>

                  <div class="item">
                    <div class="icon-sunset">
                      <i class="fa-light fa-sunset fa-4x"></i>
                    </div>
                    <div>
                      <p>Sunset</p>
                      <h2>${sSetTime}</h2>
                    </div>
                  </div>

                </div>
        `;

        humidityVal.innerHTML = `${humidity} %`;
        pressureVal.innerHTML = `${pressure} hPa`;
        visibilityVal.innerHTML = `${visibility / 1000} km`;
        windSpeedVal.innerHTML =  `${speed} m/s`;

    }).catch(() => {
        alert('Failed to fetch current weather');
    });


    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';

        for(i = 0; i <= 7; i++) {
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';

            if (hr < 12) {
                a = 'AM';
            }

            if (hr == 0) {
                hr = 12;
            }

            if (hr > 12) {
                hr = hr - 12;
            }

            hourlyForecastCard.innerHTML += `
                <div class="card">
                    <p>${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}@2x.png" alt="" class="hourly-forecast-icon">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
            `;
        }

        console.log(data);
        let uniqueForecastDays = [];
        let sevenDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();

            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        sevenDaysForecastCard.innerHTML = '';
        console.log(sevenDaysForecast);

        for(i = 1; i < sevenDaysForecast.length; i++) {
            let date = new Date(sevenDaysForecast[i].dt_txt);

            sevenDaysForecastCard.innerHTML += `
                <div class="forecast-item">
                  <div class="icon-wrapper">
                    <img class="img-fixing" src="https://openweathermap.org/img/wn/${sevenDaysForecast[i].weather[0].icon}@2x.png" alt="">
                    <span>${(sevenDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                  </div>

                  <p>${date.getDate()} ${months[date.getMonth()]}</p>
                  <p>${sevenDaysForecast[i].weather[0].description}</p>
                </div>
            `;
        }

    }).catch(() => {
        alert(`Failed to fetch weather forecast`);
    });
}


function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    console.log(cityName);

    cityInput.value = '';

    if (!cityName) {
        return;
    }

    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);

    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);

    });
    
}


function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        //console.log(latitude, longitude);
        let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            //console.log(data);
            let {name, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);

        }).catch(() => {
            alert('Failed to fetch the reverse geolocation');
        });
    });
}

searchBtn.addEventListener('click', getCityCoordinates);

locationBtn.addEventListener('click', getUserCoordinates);