// GenerateOutfitPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './generateOutfit.css'

const GenerateOutfit = () => {
  const [weatherData, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [outfitResult, setOutfitResult] = useState('');
  const [wardrobeItems, setWardrobeItems] = useState([]);

  // Fetch weather information when the component mounts
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=5a47cffe740776292c22b68ca2c992cb`
      );
      setWeather(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const generateOutfit = ({ wardrobeItems }) => {
    // Filter the wardrobeItems based on the selected style
    const filteredItems = wardrobeItems.filter(item => item.tags.includes(selectedStyle));
    
    // If there are no items matching the selected style, return a message
    if (filteredItems.length === 0) {
      setOutfitResult(`No items found for ${selectedStyle} style.`);
    } else {
      // Randomly select an item from the filteredItems
      const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
      setOutfitResult(`Generated Outfit for ${selectedStyle} style: ${randomItem.name}`);
    }
  };

  return (
    <div class="generate-outfit-container">
        <div>
            <div class="weather-text-box">
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
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Feels like : {weatherData.main.feels_like}°C</p>
                <p>Humidity : {weatherData.main.humidity}%</p>
                <p>Pressure : {weatherData.main.pressure}</p>
                <p>Wind Speed : {weatherData.wind.speed}m/s</p>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>

      <h1>Generate Outfit</h1>

      {/* <p>Today in '{LOCATION}': {weather}</p> */}

      <label htmlFor="style-selector">Select Style:</label>
      <select id="style-selector" onChange={(e) => setSelectedStyle(e.target.value)}>
        <option value="comfy">Comfy</option>
        <option value="cute">Cute</option>
        <option value="formal">Formal</option>
      </select>

      <button onClick={() => generateOutfit({ wardrobeItems })}>Generate Outfit</button>

      <div>{outfitResult}</div>
    </div>
  );
};

export default GenerateOutfit;
