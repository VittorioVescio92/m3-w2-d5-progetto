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
          <div className="rounded-5 border border-dark p-3 d-flex-justify-content-center">
            <div>
              <h2>{selectedLocation.name}</h2>
            </div>
            <div>
              <p className="fs-5">
                Condizioni meteo attuali:
                {(() => {
                  switch (selectedLocation.weather[0].description) {
                    case "clear sky":
                      return selectedLocation.weather[0].description + " 🌞";
                    case "few clouds":
                      return selectedLocation.weather[0].description + " ☁";
                    case "light rain":
                      return selectedLocation.weather[0].description + " ☂";
                    default:
                      return "";
                  }
                })()}
              </p>

              <p className="fs-5">Temp:{selectedLocation.main.temp}</p>
              <p className="fs-5">Min:{selectedLocation.main.temp_min}</p>
              <p className="fs-5">Max:{selectedLocation.main.temp_max}</p>
              <p className="fs-5">Humidity:{selectedLocation.main.humidity}%</p>
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
