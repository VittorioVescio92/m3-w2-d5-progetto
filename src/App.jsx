import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LocationWeather from "./components/LocationWeather";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:location-weather" element={<LocationWeather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
