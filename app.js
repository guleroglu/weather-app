const url = "https://api.openweathermap.org/data/2.5/"
const key = 'd20d9f9e20c9298d572bd66760e83296';
const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search-input');
const content = document.querySelector(".content")

const getWeather = () => {
    const cityName = searchInput.value;
    let finalURL =  `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        getWeatherUI(data);
        searchInput.value = "";
    })
}

const getWeatherUI = (data) => {
    content.innerHTML = "";
    const city = document.createElement('div');
    city.classList.add("city");
    city.innerHTML = `<i class="fa-solid fa-location-dot"></i>${data.name}, ${data.sys.country}`;
    

    const temp = document.createElement('div');
    temp.classList.add("temp");
    temp.innerHTML = `${Math.round(data.main.temp)}°C`


    const desc = document.createElement('div');
    desc.classList.add("desc");
    desc.innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLowerCase();


    const img = document.createElement('img');
    img.classList.add("img");
    img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`

    const minmax = document.createElement('div');
    minmax.classList.add('minmax');
    minmax.innerHTML = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

    content.appendChild(city);
    content.appendChild(temp);
    content.appendChild(desc);
    content.appendChild(img);
    content.appendChild(minmax);


}

window.addEventListener('load', () => {
    searchInput.value = 'Istanbul';
    getWeather();
});

searchBtn.addEventListener('click', getWeather);
