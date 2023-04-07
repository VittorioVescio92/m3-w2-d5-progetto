import React, { useState } from "react";
import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import NavBar from "./Navbar";
import LocationComponent from "./LocationComponent";

const HomePage = () => {
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [selectedLocationData, setselectedLocationData] = useState({});

  const baseEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=`;
  const APIkey = "53f42c6c32e4fc8ca77d9279243ee9a8";

  const handleChange = e => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    fetch(baseEndpoint + location + "&appid=" + APIkey)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error in fetch");
        }
      })
      .then(data => {
        setLocationData([...locationData, data]);
        const { lat, lon } = data[0];
        WeatherSearch(lat, lon);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const WeatherSearch = (lat, lon) => {
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
    fetch(weatherEndpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then(data => {
        setselectedLocationData(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar />
      <Row>
        <Col xs={8} className="mx-auto my-3">
          <h1>Località:</h1>
        </Col>
        <Col xs={8} className="mx-auto">
          <Form className="position-relative input-group">
            <Form.Control
              type="search"
              value={location}
              onChange={handleChange}
              placeholder="Inserisci la località che vuoi ricercare"
            />
            <Button className="p-3" onClick={handleSearch}>
              Cerca
            </Button>
          </Form>
        </Col>
        <Col xs={8} className="mx-auto my-3">
          {selectedLocationData.name && (
            <LocationComponent key={selectedLocationData.id} weatherData={selectedLocationData} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
