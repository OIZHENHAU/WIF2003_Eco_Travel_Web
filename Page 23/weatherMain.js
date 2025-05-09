const menus = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menus.classList.add("display"); 
});

closeBtn.addEventListener("click", () => {
    menus.classList.remove("display"); 
})


let cityInput = document.getElementById("city-input"),
searchBtn = document.getElementById("searchBtn"),
api_key = '595ccf47dbab693e7478d839709400da';

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    console.log(cityName);

    cityInput.value = '';

    if (!cityName) {
        return;
    }

    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},{state code},{country code}&limit={limit}&appid=${api_key}`;

    
}

searchBtn.addEventListener('click', getCityCoordinates);