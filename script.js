let weather = {
  apiKey: weatherConfig.apiKey, // OpenWeather API key
  unsplashAccessKey: unsplashConfig.accessKey, // Unsplash API key
  defaultLocation: "Bangalore", // Default location if geolocation fails
  defaultBackgroundImage: "blurryimageRain.webp", // Path to the default background image

  // Fetch weather data by city name
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  // Display weather data and fetch Unsplash image for the background
  displayWeather: function (data) {
    if (data.cod === "404") {
      alert("City not found");
      return;
    }
    const { name } = data;
    const { temp, humidity } = data.main;
    const { icon, description } = data.weather[0];
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // Fetch background image based on weather description from Unsplash
    this.fetchUnsplashImage(description);
  },

  // Fetch an Unsplash image based on the weather description
  fetchUnsplashImage: function (query) {
    fetch(
      "https://api.unsplash.com/photos/random?query=" +
        query +
        "&client_id=" +
        this.unsplashAccessKey
    )
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.regular;
        document.body.style.backgroundImage = "url('" + imageUrl + "')";
      })
      .catch((error) => {
        console.error("Error fetching Unsplash image:", error);
        // Set default background image if Unsplash fetch fails
        document.body.style.backgroundImage =
          "url('" + this.defaultBackgroundImage + "')";
      });
  },

  // Search for weather by city name
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },

  // Fetch default weather based on user's geolocation or use default location
  getDefaultWeather: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeatherByCoords(lat, lon);
        },
        () => {
          // If geolocation fails, fetch weather for the default location
          this.fetchWeather(this.defaultLocation);
          alert("Geolocation is not allowed. Defaulting to Bangalore.");
        }
      );
    } else {
      // If geolocation is not supported, fetch weather for the default location
      this.fetchWeather(this.defaultLocation);
      alert("Geolocation is not supported. Defaulting to Bangalore.");
    }
  },

  // Fetch weather by geographic coordinates
  fetchWeatherByCoords: function (lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
};

// Event listeners for search button and Enter key
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

// Fetch default weather on page load using geolocation or fallback to Bangalore
window.onload = function () {
  document.body.style.backgroundImage =
    "url('" + weather.defaultBackgroundImage + "')"; // Set default background on load
  weather.getDefaultWeather();
};
