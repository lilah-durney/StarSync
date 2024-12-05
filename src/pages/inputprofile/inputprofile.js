import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inputprofile.css";

const InputProfile = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [latitude, setLatitude] = useState(""); // Optional
  const [longitude, setLongitude] = useState(""); // Optional
  const [timezone, setTimezone] = useState(""); // Optional
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      name,
      city,
      state,
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
      hour: parseInt(hour),
      minute: parseInt(minute),
      latitude: parseFloat(latitude) || 0.0, // Replace with actual lat
      longitude: parseFloat(longitude) || 0.0, // Replace with actual lon
      timezone: parseFloat(timezone) || 0.0, // Replace with actual timezone
    };

    navigate("/userhome", { state: { userInfo } });
  };

  return (
    <div className="input-profile-container">
      <h2>Input Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <p>
          My name is{" "}
          <input
            type="text"
            className="input-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          . I was born in{" "}
          <input
            type="text"
            className="input-field"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          ,{" "}
          <input
            type="text"
            className="input-field"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          , on{" "}
          <input
            type="text"
            className="input-field"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          /{" "}
          <input
            type="text"
            className="input-field"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          /{" "}
          <input
            type="text"
            className="input-field"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          at{" "}
          <input
            type="text"
            className="input-field"
            placeholder="Hour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          :{" "}
          <input
            type="text"
            className="input-field"
            placeholder="Minute"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          />
          .
        </p>
        <button type="submit" className="generate-chart-button">
          Generate Chart
        </button>
      </form>
    </div>
  );
};

export default InputProfile;