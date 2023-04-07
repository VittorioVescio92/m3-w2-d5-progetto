// import { Button } from "react-bootstrap";
// import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import LocationWeather from "./LocationWeather";
// import { Link } from "react-router-dom";

const LocationComponent = ({ weatherData }) => {
  console.log(weatherData);

  return (
    <>
      <Row className="d-flex justify-content-center gap-5 my-3">
        <Col xs={12}>
          <div className="rounded-5 border border-dark p-3 d-flex-justify-content-center">
            <div>
              <h2>{weatherData.name}</h2>
            </div>
            <div>
              <p className="fs-5">
                Condizioni meteo attuali:
                {(() => {
                  switch (weatherData.weather[0].description) {
                    case "clear sky":
                      return weatherData.weather[0].description + " 🌞";
                    case "few clouds":
                      return weatherData.weather[0].description + " ☁";
                    case "light rain":
                      return weatherData.weather[0].description + " ☂";
                    default:
                      return "";
                  }
                })()}
              </p>

              <p className="fs-5">Temp:{weatherData.main.temp}</p>
              <p className="fs-5">Min:{weatherData.main.temp_min}</p>
              <p className="fs-5">Max:{weatherData.main.temp_max}</p>
              <p className="fs-5">Humidity:{weatherData.main.humidity}%</p>
              {/* <Button variant="warning">
            <Link to={`/${weatherData.name}`}>Vedi previsioni dettagliate</Link>
          </Button> */}
            </div>
          </div>

          <LocationWeather weatherData={weatherData} />
        </Col>
      </Row>
    </>
  );
};
export default LocationComponent;
