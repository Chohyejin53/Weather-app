import React from "react";

const WeatherButton = ({ weather, cities, selectedCity, handleCityChange }) => {
  return (
    <div className="button-box">
      <strong className="button-title">{weather?.name}</strong>
      <div className="button-area">
        <button
          className={`btn_dot ${selectedCity === null ? "active" : ""}`}
          onClick={() => handleCityChange("current")}
        >
          <span className="blind">현재위치</span>
        </button>
        {cities.map((city, index) => (
          <button
            className={`btn_dot ${selectedCity === city ? "active" : ""}`}
            key={index}
            onClick={() => handleCityChange(city)}
          >
            <span className="blind">{city}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
