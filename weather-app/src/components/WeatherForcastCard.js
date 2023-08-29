import React from 'react';

function WeatherForecastCard({ date, forecastData }) {
  const { temp, humidity } = forecastData;  // Extract temperature and humidity data from forecastData

  return (
    <div className="card">
      {/* Display the date */}
      <h4>Date: {date}</h4>
      {/* Display temperature range */}
      <p>Temperature Range: {Math.min.apply(Math, temp)} - {Math.max.apply(Math, temp)} °F</p>
      {/* Display humidity range */}
      <p>Humidity Range: {Math.min.apply(Math, humidity)} - {Math.max.apply(Math, humidity)}%</p>
      {/* Display high temperature alert if the maximum temperature is above 90°F */}
      {Math.max.apply(Math, temp) > 90 && 
        <div className="alert alert-danger" role="alert">
          High temperature alert!
        </div>
      }
    </div>
  );
}

export default WeatherForecastCard;
