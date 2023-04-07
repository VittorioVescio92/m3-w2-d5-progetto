import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LocationWeather = () => {
  const selectedLocation = useSelector(state => state.location.selectedLocation);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      const Key = "53f42c6c32e4fc8ca77d9279243ee9a8";
      const endPoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLocation.coord.lat}&lon=${selectedLocation.coord.lon}&units=metric&lang=it&appid=${Key}`;

      fetch(endPoint)
        .then(response => response.json())
        .then(data => setForecastData(data))
        .catch(error => console.log(error));
    }
  }, [selectedLocation]);

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
      {selectedLocation ? (
        <div>
          <h3>Previsioni meteo per la tua posizione</h3>
          {forecastData ? (
            Object.entries(ForecastsByDate(forecastData.list)).map(([date, forecasts]) => (
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
            ))
          ) : (
            <p>Caricamento in corso...</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default LocationWeather;
