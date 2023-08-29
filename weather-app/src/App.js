import React, { useState } from 'react';
import WeatherForecastCard from './components/WeatherForcastCard';
import navImage from './image/download.jpg'
import './App.css';

function App() {
  // State variables to store user input, weather data, and forecast data
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState([]);
  const [fetchWeatherError, setFetchWeatherError] = useState(null);
  const [forecastWeatherError, setForecastWeatherError] = useState(null);

  // Function to fetch current weather data
  const fetchWeather = async () => {
    try {
      // Fetch weather data from the server
      const response = await fetch(`http://127.0.0.1:5000/weather/${city}`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      // Parse response data and update state
      const data = await response.json();
      setWeatherData(data);
      setFetchWeatherError(null); // Clear any previous error
    } catch (error) {
      // Set error message for failed fetch
      setFetchWeatherError('Error fetching weather data');
    }
  }

  // Function to fetch weather forecast data
  const forecastWeather = async () => {
    try {
      // Fetch forecast data from the server
      const response = await fetch(`http://127.0.0.1:5000/forecast/${city}`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      // Parse response data and update state
      const data = await response.json();
      setWeatherForecastData(data);
      setForecastWeatherError(null); // Clear any previous error
    } catch (error) {
      // Set error message for failed fetch
      setForecastWeatherError('Error fetching forecast data');
    }
  }

  // Get current date and time
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="App">
      {/* Search bar for user input */}
      <div className='navBar'>
        <div className='logCon' >
          <img className='logo' src={navImage}/>
          <span>Weather Forcasting App</span>
        </div>
        <div className="searchBar">
          <input 
            type="text" 
            placeholder="Enter city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button className="button-spacing" onClick={fetchWeather}>Get Weather</button>
          <button className="button-spacing" onClick={forecastWeather}>Forecast Weather</button>
        </div>
        <div className="currentDateTime">
          <span className="dateTimeText">Date: {currentDate}</span>
          <p className="dateTimeText">Time: {currentTime}</p>
        </div>
      </div>


      {/* Display error messages if any */}
      {fetchWeatherError && <p className="error-message">{fetchWeatherError}</p>}
      {forecastWeatherError && <p className="error-message">{forecastWeatherError}</p>}
      
      {/* Display current weather information */}
      {weatherData && (
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Weather Information</h1>
              <h3>{weatherData.name}</h3>
              <p className="card-text">{weatherData.main.tempC}°C</p>
              <p className="card-text">{weatherData.main.tempF}°F</p>
              <p className="card-text">Humidity : {weatherData.main.humidity} % </p>
              <p className="card-text">{weatherData.weather[0].description}</p>
              {/* Display high temperature alert if temperature is above 90°F */}
              {weatherData.main.tempF > 90 && 
                <div className="alert alert-danger" role="alert">
                  High temperature alert!
                </div>
              }
            </div>
          </div>
        </div>
      )}
      
      {/* Display weather forecast */}
      {weatherForecastData && (
        <div className="forecast-container">
          <h3 className="forecast-title">Forecast</h3>
          <div className="forecast-cards">
            {/* Map through forecast data and display forecast cards */}
            {Object.keys(weatherForecastData).map((key, index) => (   
              <WeatherForecastCard key={index} date={key} forecastData={weatherForecastData[key]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
