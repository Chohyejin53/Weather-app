import { useEffect, useState, useCallback } from "react";
import DateBox from "./component/DateBox";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import MiniGame from "./component/MiniGame";
import ClipLoader from "react-spinners/ClipLoader";

import "./style/reset.css";
import "./style/index.css";

//1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
//2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태가 보인다 .
//3. 다섯개의 버튼이 있다. (1개는 현재위치, 4개는 다른 도시)
//4. 도시버튼을 클릭할때마다 도시 날씨가 나온다.
//5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  let [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [apiError, setAPIError] = useState("");
  const cities = ["seoul", "paris", "new york", "tokyo"];

  const ApiKey = "2e15688281c47bf5192a44e84a0814d";

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}f&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}f&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }

    console.log(city);
  };

  useEffect(() => {
    if (city === null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [getCurrentLocation, getWeatherByCity, city]);

  return (
    <>
      <div>
        {loading ? (
          <div className="loading-container">
            <ClipLoader
              color="#fff"
              loading={loading}
              className="loading-bar"
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : !apiError ? (
          <div className="wrapper">
            <header className="header">
              <div className="inner">
                <DateBox />
              </div>
            </header>
            <div className="container">
              <div className="inner">
                <WeatherButton
                  weather={weather}
                  selectedCity={city}
                  cities={cities}
                  handleCityChange={handleCityChange}
                />
                <WeatherBox weather={weather} cities={cities} />
                <MiniGame />
              </div>
            </div>
            <footer className="footer">
              <div className="inner"></div>
            </footer>
          </div>
        ) : (
          apiError
        )}
      </div>
    </>
  );
}

export default App;
