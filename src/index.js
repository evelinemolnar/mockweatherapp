function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = searchInputElement.value;
    // Add a call to your new function when the search button is clicked
    handleSearch(searchInputElement.value);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  function handleSearch(city) {
    const apiKey = "11a4762111955564b01f416b85389b2f";
    console.log(`Search for city: ${city}`);
  
    // Add your logic for handling the search here
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        console.log("Current Temp:", response.data);
        const temperature = response.data.main.temp;
        let tempElement = document.querySelector("#current-temperature-value");
        tempElement.innerHTML = temperature;
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateElement.innerHTML = formatDate(currentDate);
  