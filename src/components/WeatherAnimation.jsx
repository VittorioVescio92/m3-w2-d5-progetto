import React from "react";
import { useSpring, animated } from "@react-spring/web";

const WeatherAnimation = ({ weatherCode }) => {
  const weatherIcons = {
    "cielo sereno": "CLEAR_DAY",
    "nubi sparse": "PARTLY_CLOUDY_DAY",
    "poche nuvole": "PARTLY_CLOUDY_DAY",
    "cielo coperto": "CLOUDY",
    "pioggia leggera": "RAIN",
    "pioggia moderata": "RAIN",
    neve: "SNOW",
  };

  const icon = weatherIcons[typeof weatherCode === "string" ? weatherCode.toLowerCase() : ""];

  const styles = useSpring({
    loop: false,
    to: [
      { opacity: 1, transform: "scale(1.2)" },
      { opacity: 0, transform: "scale(0.8)" },
      { opacity: 1, transform: "scale(1.2)" },
    ],
    from: { opacity: 1, transform: "scale(1)" },
  });

  if (!icon) {
    return null;
  }

  return (
    <animated.img
      src={`../img/${icon}.svg`}
      alt={weatherCode}
      style={{
        ...styles,
        display: "block",
        width: "200px",
        height: "200px",
      }}
    />
  );
};

export default WeatherAnimation;
