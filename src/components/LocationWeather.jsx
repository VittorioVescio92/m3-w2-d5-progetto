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
      const date = new Date(forecast.dt * 1000).toLocaleDateString([], {
        weekday: "short",
        day: "numeric",
      });
      const time =
        new Date(forecast.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) + ".00";
      if (acc[date]) {
        acc[date].push({ ...forecast, time });
      } else {
        acc[date] = [{ ...forecast, time }];
      }
      return acc;
    }, {});
  };

  return (
    <div className="d-flex justify-content-center">
      {selectedLocation ? (
        <div>
          <h3>Previsioni meteo per {selectedLocation.name}</h3>
          <div className="d-flex flex-column my-3">
            {forecastData ? (
              Object.entries(ForecastsByDate(forecastData.list)).map(([date, forecasts]) => (
                <div key={date}>
                  <h4>{date}</h4>
                  {forecasts.map((forecast, index) => (
                    <div key={index}>
                      <p>Orario: {forecast.time.slice(0, -3)}</p>
                      <p>
                        Condizioni meteo: {forecast.weather[0].description}
                        {(() => {
                          switch (forecast.weather[0].description) {
                            case "cielo sereno":
                              return " 🌞";
                            case "nubi sparse":
                            case "poche nuvole":
                            case "cielo coperto":
                              return " ☁";
                            case "pioggia leggera":
                              return " ☂";
                            case "neve":
                              return " ❄";
                            default:
                              return "";
                          }
                        })()}
                      </p>

                      <p>Temperatura: {" " + Math.round(forecast.main.temp)}°C</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>Caricamento in corso...</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LocationWeather;
