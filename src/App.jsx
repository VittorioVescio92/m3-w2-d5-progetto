import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LocationWeather from "./components/LocationWeather";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:locationWeather" element={<LocationWeather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
