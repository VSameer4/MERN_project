import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
      setError("Could not fetch weather data. Try again.");
    }
  };

  const handleClick = () => {
    if (city.trim()) fetchWeather();
  };

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

  return (
    <div className="weather-container">
      <h1 className="title">🌤️ Weather Dashboard</h1>
      <div className="search-box">
        <input
          type="text"
          value={city}
          placeholder="Enter city name..."
          onChange={handleCityChange}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        />
        <button onClick={handleClick}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <h3>{weather.weather[0].main}</h3>
          <p className="description">"{weather.weather[0].description}"</p>

          <div className="temp-section">
            <h1>{kelvinToCelsius(weather.main.temp)}°C</h1>
            <p>Feels like {kelvinToCelsius(weather.main.feels_like)}°C</p>
          </div>

          <div className="details">
            <div>
              <strong>Humidity:</strong> {weather.main.humidity}%
            </div>
            <div>
              <strong>Pressure:</strong> {weather.main.pressure} hPa
            </div>
            <div>
              <strong>Wind:</strong> {weather.wind.speed} m/s
            </div>
            <div>
              <strong>Clouds:</strong> {weather.clouds.all}%
            </div>
            <div>
              <strong>Visibility:</strong> {(weather.visibility / 1000).toFixed(1)} km
            </div>
            <div>
              <strong>Min Temp:</strong> {kelvinToCelsius(weather.main.temp_min)}°C
            </div>
            <div>
              <strong>Max Temp:</strong> {kelvinToCelsius(weather.main.temp_max)}°C
            </div>
            <div>
              <strong>Sunrise:</strong>{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </div>
            <div>
              <strong>Sunset:</strong>{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
