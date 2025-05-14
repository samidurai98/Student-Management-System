import axios from "axios";
import React, { useState } from "react";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    function fetchData(e) {
        e.preventDefault();

        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }

        setError("");
        setWeather(null);

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb2cfa96916ad6d2a7fe54935f5b0c05&units=metric`)
            .then((res) => setWeather(res.data))
            .catch(() => setError("City not found or API error"));
    }

    return (
    <div>

<div className="wh">
            <h2 className="whh">Weather App</h2>
            <form onSubmit={fetchData}>
                <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}/>
                <button type="submit"  class="cc">Get Weather</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div>
                    <h3>{weather.name}, {weather.sys.country}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    </div>
    );
}

export default Weather;