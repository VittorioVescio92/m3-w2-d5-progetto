import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WeatherAnimation from "./WeatherAnimation";

const LocationComponent = () => {
  const selectedLocation = useSelector(state => state.location.selectedLocation);
  const navigate = useNavigate();

  return (
    <>
      <Row className="d-flex justify-content-center gap-5 my-2">
        <Col xs={12}>
          <Row className="rounded-5 p-5 d-flex-justify-content-center">
            <Col xs={6}>
              <div>
                <h2>{selectedLocation.name}</h2>
              </div>
              <div>
                <p className="fs-5">
                  Condizioni meteo attuali:
                  {(() => {
                    const currentHour = new Date().getHours();
                    const weatherDescription = selectedLocation.weather[0].description;
                    switch (weatherDescription) {
                      case "cielo sereno":
                        return currentHour >= 20 || currentHour < 6 ? "cielo notturno 🌜" : "cielo sereno 🌞";
                      case "nubi sparse":
                      case "poche nuvole":
                      case "cielo coperto":
                        return weatherDescription + " ☁";
                      case "pioggia leggera":
                      case "pioggia moderata":
                        return weatherDescription + " ☂";
                      case "neve":
                        return weatherDescription + " ❄";
                      default:
                        return "";
                    }
                  })()}
                </p>

                <p className="fs-5">Temp:{" " + Math.round(selectedLocation.main.temp)}°C</p>
                <p className="fs-5">Min:{" " + Math.round(selectedLocation.main.temp_min)}°C</p>
                <p className="fs-5">Max:{" " + Math.round(selectedLocation.main.temp_max)}°C</p>
                <p className="fs-5">Umidità:{" " + selectedLocation.main.humidity}%</p>
                <Button variant="warning" onClick={() => navigate(`/${selectedLocation.name}`)}>
                  Vedi previsioni dettagliate
                </Button>
              </div>
            </Col>
            <Col xs={6} className="d-flex justify-content-center align-items-center">
              <WeatherAnimation weatherCode={selectedLocation.weather[0].description} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LocationComponent;
