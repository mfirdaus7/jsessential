function showweatherDetails(event) {
  event.preventDefault();

  const city = document.getElementById("city").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");
  const apiKey = "c4f86ece00bc8aa272652ac9065af12d";

  if (!city) {
    weatherInfo.textContent = "Please enter a city name.";
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          response.status === 404 ? "City not found." : "Something went wrong.",
        );
      }
      return response.json();
    })
    .then((data) => {
      weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} &#8451;</p>
        <p>Weather: ${data.weather[0].description}</p>`;
    })
    .catch((error) => {
      weatherInfo.textContent = error.message;
    });
}

document
  .getElementById("weatherForm")
  .addEventListener("submit", showweatherDetails);
