import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const LocationComponent = ({ weatherData, index }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>Condizioni meteo: {weatherData.weather[0].description}</p>
      <Button
        variant="warning"
        onClick={() => {
          dispatch({ type: "DETAILS", payload: index });
        }}
      >
        Visualizza previsioni
      </Button>
    </div>
  );
};

export default LocationComponent;
