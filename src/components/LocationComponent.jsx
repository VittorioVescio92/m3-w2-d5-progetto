import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LocationComponent = () => {
  const selectedLocation = useSelector(state => state.location.selectedLocation);
  const navigate = useNavigate();

  return (
    <>
      <Row className="d-flex justify-content-center gap-5 my-3">
        <Col xs={12}>
          <div className="rounded-5 border border-dark p-5 d-flex-justify-content-center">
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LocationComponent;
