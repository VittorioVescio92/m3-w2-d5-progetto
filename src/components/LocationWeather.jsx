import { useEffect, useState } from "react";

const LocationWeather = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const Key = "53f42c6c32e4fc8ca77d9279243ee9a8";
    const endPoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${Key}`;

    fetch(endPoint)
      .then(response => response.json())
      .then(data => setForecastData(data))
      .catch(error => console.log(error));
  }, [lat, lon]);

  const ForecastsByDate = forecasts => {
    return forecasts.reduce((acc, forecast) => {
      const dateTime = forecast.dt_txt.split(" ");
      const date = dateTime[0];
      const time = dateTime[1];
      if (acc[date]) {
        acc[date].push({ ...forecast, time });
      } else {
        acc[date] = [{ ...forecast, time }];
      }
      return acc;
    }, {});
  };

  return (
    <div>
      {forecastData ? (
        <div>
          <h3>Previsioni meteo per la tua posizione</h3>
          {Object.entries(ForecastsByDate(forecastData.list)).map(([date, forecasts]) => (
            <div key={date}>
              <h4>{date}</h4>
              {forecasts.map((forecast, index) => (
                <div key={index}>
                  <p>Orario: {forecast.time}</p>
                  <p>Condizioni meteo: {forecast.weather[0].description}</p>
                  <p>Temperatura: {forecast.main.temp}°C</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </div>
  );
};

export default LocationWeather;
