# Weather App

**Problem Statement**: Create a Weather App that provides real-time weather information based on user location preferences or search requests. The app should utilize external APIs for weather data and dynamic background images.

## Features
- **Automatic Location Detection**: The app automatically detects the user's location and displays the current weather information.
- **Dynamic Background Images**: Changes background images based on the weather description using the Unsplash API.
- **Weather Information Display**: Shows current temperature, humidity, wind speed, and weather conditions in a user-friendly interface.

## Technologies Used
- **HTML/CSS/JavaScript**: Core technologies for building the web app.
- **OpenWeatherMap API**: For fetching real-time weather data.
- **Unsplash API**: For dynamic background images based on weather conditions.

## Screenshot

![Screenshot 2024-10-25 at 12 03 29 AM](https://github.com/user-attachments/assets/d759bd5e-2bb1-485a-8c18-2f95a7c299d4)


## Steps to Use
1. **Clone the repository**:
   ```bash
   git clone https://github.com/shankersingh01/Weather-App.git
   ```
2. **Open the `index.html` file** in a web browser.
3. **Allow location access** (if prompted) to automatically detect your location.
4. **Search for weather information** for other locations if desired.

## Installation
No installation is required. Just open `index.html` in a web browser.

## API Integration
- **OpenWeatherMap API**: Sign up for a free API key and replace it in your JavaScript code:
   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

- **Unsplash API**: Sign up for a free API key for dynamic background images:
   ```javascript
   const unsplashApiKey = 'YOUR_UNSPLASH_API_KEY_HERE';
   ```

## Future Enhancements
- Implement a weather forecast feature for upcoming days.
- Add unit conversion options (Celsius/Fahrenheit).
- Include additional details like sunrise and sunset times.

