function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

  function refreshWeather(response){
    let tempElement = document.querySelector("#current-temperature-value");
    let descriptionElement = document.querySelector("#current-details-description");
    let humidityElement = document.querySelector("#current-details-humidity");
    let windElement = document.querySelector("#current-details-wind");
    let cityElement = document.querySelector("#current-city");
    let timeElement = document.querySelector("#current-date");
    let date = new Date(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");

    console.log("Current Temp:", response.data);
    cityElement.innerHTML = response.data.name;
    timeElement.innerHTML = formatDate(date);

    tempElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png" alt="weather icon" />`;
  }
  
  function handleSearch(city) {
    const apiKey = "11a4762111955564b01f416b85389b2f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(`Search for city: ${city}`);
  
    axios
      .get(apiUrl)
      .then(refreshWeather)
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-input");
    handleSearch(cityInputElement.value);
  }

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);

 handleSearch("Paris");