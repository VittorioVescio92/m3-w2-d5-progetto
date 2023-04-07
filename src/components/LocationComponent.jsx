// import { Button } from "react-bootstrap";
// import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import LocationWeather from "./LocationWeather";
// import { Link } from "react-router-dom";

const LocationComponent = ({ weatherData }) => {
  console.log(weatherData);

  return (
    <>
      <Row className="d-flex">
        <Col xs={5}>
          <h2>{weatherData.name}</h2>
          <p>Condizioni meteo attuali: {weatherData.weather[0].description}</p>
          <p>Temp:{weatherData.main.temp}</p>
          <p>Min:{weatherData.main.temp_min}</p>
          <p>Max:{weatherData.main.temp_max}</p>
          <p>Humidity:{weatherData.main.humidity}%</p>
          {/* <Button variant="warning">
            <Link to={`/${weatherData.name}`}>Vedi previsioni dettagliate</Link>
          </Button> */}
        </Col>
        <Col xs={7}>
          <LocationWeather weatherData={weatherData} />
        </Col>
      </Row>
    </>
  );
};
export default LocationComponent;
