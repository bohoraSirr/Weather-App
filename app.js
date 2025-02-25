const apiKey = "f4779024a27a05743925caf0f2cfb86e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

 //Logic for returning error[404] incase of invalid city name
 if(response.status == 404){

    //to block none property from error msg and hide weather data.. 
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}else {
    let data = await response.json();

    //to access & display city name with temp,humo ,wind speed
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    //to display img acc. to weather status from api calling
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "img/clouds.jpeg";
    } else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "img/sunny.jpg";
    } else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "img/rain.jpg";
    } else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "img/drizzle.webp";
    } else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "img/mist.png";
    } else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "img/snow.webp";
    }

    //to block none property of weather data and hide error msg
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
   
}

//Adding click evt to search button to run async funt.
searchBtn.addEventListener(("click"), ()=> {
    checkWeather(searchBox.value);
})

