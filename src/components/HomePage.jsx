import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import LocationComponent from "./LocationComponent";
import { useSelector, useDispatch } from "react-redux";

const HomePage = props => {
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState([]);
  const selectedLocation = useSelector(state => state.location.selectedLocation);
  const dispatch = useDispatch();

  const baseEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=`;
  const APIkey = "53f42c6c32e4fc8ca77d9279243ee9a8";

  const handleChange = e => {
    setLocation(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    fetch(baseEndpoint + location + "&lang=it&appid=" + APIkey)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
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
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${APIkey}`;
    fetch(weatherEndpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then(data => {
        dispatch({ type: "DETAILS", payload: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Row className="mb-5">
        <div id="località" className="py-5 mb-2">
          <Col xs={8} className="mx-auto py-4">
            <h2 className="text-dark fs-1">Località:</h2>
          </Col>
          <Col xs={8} className="mx-auto pb-5">
            <Form className="position-relative input-group" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                value={location}
                onChange={handleChange}
                placeholder="Inserisci la località"
              />
              <Button type="submit" className="p-3">
                Cerca
              </Button>
            </Form>
          </Col>
        </div>
        <Col xs={8} className="mx-auto my-3 shadow rounded-5">
          {selectedLocation.name && <LocationComponent key={selectedLocation.id} />}
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
