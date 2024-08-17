import React from "react";
import iconMap from "./IconWeather";

const WeatherBox = ({ weather }) => {
  const tempC = weather && weather.main ? Math.round(weather.main.temp) : "";
  const tempF =
    weather && weather.main
      ? ((weather.main.temp * 9) / 5 + 32).toFixed(2)
      : "";
  const tempMaxC =
    weather && weather.main ? Math.round(weather.main.temp_max) : "";
  const tempMinC =
    weather && weather.main ? Math.round(weather.main.temp_min) : "";
  const feelTempC =
    weather && weather.main ? Math.round(weather.main.feels_like) : "";

  const weatherDescription =
    weather && weather.weather.length > 0 ? weather.weather[0].description : "";

  const iconName =
    weather && weather.weather.length > 0 ? weather.weather[0].icon : "";

  // const weatherIcon = `icon_${iconName}`;
  return (
    <div className="weather-box">
      <div className="current-temp">
        <p className="tempC">
          <strong>{tempC || ""} </strong>
        </p>
        <div className="description">
          <p>Feels like {feelTempC || ""}⁰C</p>
        </div>
        <p className="tempF">
          <strong>{tempF || ""}</strong>
        </p>
      </div>
      <div className="info">
        <div className="max-min">
          <p>
            <span className="des-title">Max.</span>
            <span className="des-temp">
              {weather && weather.main ? tempMaxC : ""}⁰C
            </span>
          </p>
          <p>
            <span className="des-title">Min.</span>
            <span className="des-temp">
              {weather && weather.main ? tempMinC : ""}⁰C
            </span>
          </p>
        </div>
        <p className="info-text">
          {weather && weather ? weatherDescription : ""}
        </p>
      </div>

      <div className="weather-icon">
        <img src={iconMap[iconName]} alt="현재날씨" />
      </div>
    </div>
  );
};

export default WeatherBox;
