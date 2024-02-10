const key = "b3de1c850653b46079f22dfc54c07e8e";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const cityTitle = document.getElementById("cityTitle");
const tempreature = document.getElementById("temp");
const weatherStatus = document.getElementById("status");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const windSpeed = document.getElementById("aqi");
const humidity = document.getElementById("humidity");
const minTemp = document.getElementById("precipitation");
const pressure = document.getElementById("pressure");
const weatherImage = document.getElementById("weather_img");


async function getWeather(city) {
    const response = await fetch(url + `&q=${city}&appid=${key}`);
    var data = await response.json();
    if(data.cod == "404")
    {
        alert("Sorry, Location Not Found !!!");
        return;
    }
    // console.log(data);
    cityTitle.innerHTML = data.name;
    tempreature.innerHTML = Math.floor(data.main.temp) + "°C";
    weatherStatus.innerHTML = data.weather[0].description;
    windSpeed.innerHTML = (data.wind.speed * 18 / 5).toFixed(2) + " km/hr";
    humidity.innerHTML = data.main.humidity + "%";
    minTemp.innerHTML = Math.floor(data.main.temp_min) + "°C";
    pressure.innerHTML = data.main.pressure + " hPa";
    sunrise.innerHTML = fetchTime(new Date(data.sys.sunrise*1000));
    sunset.innerHTML = fetchTime(new Date(data.sys.sunset*1000));
    setImage(data.weather[0].description, data.weather[0].main);
}

let city = document.querySelector(".input");
let searchButton = document.querySelector("#search_button");

searchButton.addEventListener("click", () => {
    getWeather(city.value);
})

city.addEventListener("keypress", (e)=>{
    if(e.key === 'Enter')
    {
        getWeather(city.value);
    }
})


function fetchTime(date) {

    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

function setImage(condition, condition_main)
{
    if(condition === "clear sky")
    {
        weatherImage.src="sunny_icon.png";
    }
    else if(condition === "few clouds")
    {
        weatherImage.src="partially_cloudy.png";
    }
    else if(condition === "scattered clouds")
    {
        weatherImage.src="scattered_clouds.png";
    }
    else if(condition === "broken clouds" || condition_main === "Clouds")
    {
        weatherImage.src="broken_clouds.png";
    }
    else if(condition === "shower rain")
    {
        weatherImage.src="shower_rain.png";
    }
    else if(condition === "rain" || condition_main === "Rain")
    {
        weatherImage.src="rain.png";
    }
    else if(condition === "thunderstorm" || condition_main === "Thunderstorm" || condition_main === "Drizzle")
    {
        weatherImage.src="thunderstorm.png";
    }
    else if(condition === "snow" || condition_main === "Snow")
    {
        weatherImage.src="snow.png";
    }
    else if(condition === "mist" || condition === "smoke" || condition === "sand" || condition === "dust" || condition === "squalls" || condition === "tornado")
    {
        weatherImage.src="mist.png";
    }
    else if(condition === "haze")
    {
        weatherImage.src="haze.png";
    }
}