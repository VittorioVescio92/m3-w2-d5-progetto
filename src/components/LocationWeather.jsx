import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
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
    <div id="località" className="d-flex justify-content-center px-3 px-md-5">
      {selectedLocation ? (
        <div>
          <div className="d-flex flex-column my-3 justify-content-center container">
            <h3 id="forecast" className="text-center shadow rounded-5 py-4 text-light">
              Previsioni meteo per {selectedLocation.name}
            </h3>
            {forecastData ? (
              <>
                {Object.entries(ForecastsByDate(forecastData.list)).map(([date, forecasts]) => (
                  <div id="forecast" className="rounded-5 shadow my-2 px-5" key={date}>
                    <h4 className="text-center fs-3 mt-2 pt-2">{date}</h4>
                    <Row>
                      {forecasts.map((forecast, index) => (
                        <Col md={4} lg={3} className="text-center p-2" key={index}>
                          <div id="card" className="border border-dark rounded-5 p-3 mb-3">
                            <p className="fs-5 fw-semibold ">
                              Orario: {forecast.time.slice(0, -3)}
                              {(() => {
                                switch (forecast.weather[0].description) {
                                  case "cielo sereno":
                                    const hour = new Date(forecast.dt_txt).getHours();
                                    if (hour >= 20 || hour < 6) {
                                      return " 🌜";
                                    } else {
                                      return " 🌞";
                                    }
                                  case "nubi sparse":
                                  case "poche nuvole":
                                  case "cielo coperto":
                                    return " ☁";
                                  case "pioggia leggera":
                                  case "pioggia moderata":
                                    return " ☂";
                                  case "neve":
                                    return " ❄";
                                  default:
                                    return "";
                                }
                              })()}
                            </p>
                            <p>Condizioni meteo: {forecast.weather[0].description}</p>
                            <p>Temperatura: {" " + Math.round(forecast.main.temp)}°C</p>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </>
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
