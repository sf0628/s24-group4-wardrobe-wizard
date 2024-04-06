// GenerateOutfit.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './generateOutfit.css'

const GenerateOutfit = () => {
  const [weatherData, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [outfitResult, setOutfitResult] = useState('');
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); 

  // Fetch weather information when the component mounts
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${isCelsius ? 'metric' : 'imperial'}&appid=5a47cffe740776292c22b68ca2c992cb`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [isCelsius]); 

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!city) {
      alert('Please fill in all fields.');
      return;
    }

    e.preventDefault();
    fetchWeather();
  };

  const generateOutfit = () => {
    // Define temperature thresholds
    const mod_min = isCelsius ? 4 : 40;
    const mod_max = isCelsius ? 21 : 70;

    // Filter wardrobeItems based on weather conditions
    const filteredItems = wardrobeItems.filter(item => {
      const weather = item.weather.toLowerCase();
      const temperature = weatherData.main.temp;

      // Determine weather suitability based on temperature and weather tags
      if (temperature >= mod_max && weather.includes('warm')) {
        return true; // warm weather
      } else if (temperature >= mod_min && temperature <= mod_max && weather.includes('moderate')) {
        return true; // Moderate weather
      } else if (temperature < mod_min && weather.includes('cold')) {
        return true; // Cold weather
      } else {
        return false; // Not suitable for current weather
      }
    });

    if (filteredItems.length === 0) {
      setOutfitResult(`No suitable items found for the current weather.`);
    } else {
      const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
      setOutfitResult(`Generated Outfit: ${randomItem.name}`);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(prevState => !prevState); // Toggle temperature unit between Celsius and Fahrenheit
  };

  return (
    <div className="generate-outfit-container">
        <div>
            <div className="weather-text-box">
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                    />
                    <button type="submit">Get Weather</button>
                </form>
            </div>
            {weatherData ? (
                <>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp} {isCelsius ? '°C' : '°F'}</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Feels like : {weatherData.main.feels_like} {isCelsius ? '°C' : '°F'}</p>
                <p>Humidity : {weatherData.main.humidity}%</p>
                <p>Pressure : {weatherData.main.pressure}</p>
                <p>Wind Speed : {weatherData.wind.speed}{isCelsius ? ' m/s' : ' mph'}</p>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>

      <h1>Generate Outfit</h1>

      <label htmlFor="style-selector">Select Style:</label>
      <select id="style-selector" onChange={(e) => setSelectedStyle(e.target.value)}>
        <option value="comfy">Comfy</option>
        <option value="cute">Cute</option>
        <option value="formal">Formal</option>
      </select>

      <button onClick={generateOutfit}>Generate Outfit</button>

      <button onClick={toggleTemperatureUnit}>
        Change Units (to {isCelsius ? 'Imperial' : 'Metric'})
      </button>

      <div>{outfitResult}</div>
    </div>
  );
};

export default GenerateOutfit;
