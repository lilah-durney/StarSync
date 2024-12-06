import React, { useState } from "react";

const CompatibilityAnalysis = ({ userInfo }) => {
  const [partnerInfo, setPartnerInfo] = useState({
    city: "",
    state: "",
    birthDate: "",
    birthTime: "",
    tzone: 0,
  });
  const [compatibilityReport, setCompatibilityReport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerInfo({ ...partnerInfo, [name]: value });
  };

  const fetchLatLong = async (city, state) => {
    const apiKey = "YOUR_OPENCAGE_API_KEY";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)},${encodeURIComponent(
      state
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results[0]) {
        return {
          lat: data.results[0].geometry.lat,
          lon: data.results[0].geometry.lng,
        };
      } else {
        throw new Error("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching latitude and longitude:", error);
      return null;
    }
  };

  const fetchCompatibility = async () => {
    const { birthDate, birthTime, city, state, tzone } = partnerInfo;

    if (!birthDate || !birthTime || !city || !state) {
      alert("Please provide all required information.");
      return;
    }

    setLoading(true);

    const [pDay, pMonth, pYear] = birthDate.split("-");
    const [pHour, pMin] = birthTime.split(":");

    const location = await fetchLatLong(city, state);

    if (!location) {
      alert("Unable to fetch latitude and longitude. Please check the city and state.");
      setLoading(false);
      return;
    }

    const data = {
      day: parseInt(pDay),
      month: parseInt(pMonth),
      year: parseInt(pYear),
      hour: parseInt(pHour),
      min: parseInt(pMin),
      lat: location.lat,
      lon: location.lon,
      tzone: parseFloat(tzone) || 0.0,
    };

    const apiBaseUrl = "https://json.astrologyapi.com/v1";
    const apiUserId = "635385";
    const apiKey = "e0d5b714f7697abe3d8f547032736c3707da18b8";
    const authHeader = "Basic " + btoa(`${apiUserId}:${apiKey}`);

    try {
      const response = await fetch(`${apiBaseUrl}/romantic_personality_report/tropical`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCompatibilityReport(result?.report?.join(" ") || "No compatibility report available.");
    } catch (error) {
      console.error("Error fetching compatibility report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Compatibility Analysis</h3>
      <form>
        <label>
          Partner's Birth Date:
          <input type="date" name="birthDate" onChange={handleInputChange} />
        </label>
        <label>
          Partner's Birth Time:
          <input type="time" name="birthTime" onChange={handleInputChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" onChange={handleInputChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" onChange={handleInputChange} />
        </label>
        <label>
          Timezone:
          <input type="number" step="0.01" name="tzone" onChange={handleInputChange} />
        </label>
        <button type="button" onClick={fetchCompatibility}>
          Get Compatibility Report
        </button>
      </form>
      {loading ? (
        <p>Loading compatibility report...</p>
      ) : (
        <div>
          <h4>Compatibility Report</h4>
          <p>{compatibilityReport}</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityAnalysis;
import React, { useState } from "react";

const CompatibilityAnalysis = ({ userInfo }) => {
  const [partnerInfo, setPartnerInfo] = useState({
    city: "",
    state: "",
    birthDate: "",
    birthTime: "",
    tzone: 0,
  });
  const [compatibilityReport, setCompatibilityReport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerInfo({ ...partnerInfo, [name]: value });
  };

  const fetchLatLong = async (city, state) => {
    const apiKey = "YOUR_OPENCAGE_API_KEY";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)},${encodeURIComponent(
      state
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results[0]) {
        return {
          lat: data.results[0].geometry.lat,
          lon: data.results[0].geometry.lng,
        };
      } else {
        throw new Error("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching latitude and longitude:", error);
      return null;
    }
  };

  const fetchCompatibility = async () => {
    const { birthDate, birthTime, city, state, tzone } = partnerInfo;

    if (!birthDate || !birthTime || !city || !state) {
      alert("Please provide all required information.");
      return;
    }

    setLoading(true);

    const [pDay, pMonth, pYear] = birthDate.split("-");
    const [pHour, pMin] = birthTime.split(":");

    const location = await fetchLatLong(city, state);

    if (!location) {
      alert("Unable to fetch latitude and longitude. Please check the city and state.");
      setLoading(false);
      return;
    }

    const data = {
      day: parseInt(pDay),
      month: parseInt(pMonth),
      year: parseInt(pYear),
      hour: parseInt(pHour),
      min: parseInt(pMin),
      lat: location.lat,
      lon: location.lon,
      tzone: parseFloat(tzone) || 0.0,
    };

    const apiBaseUrl = "https://json.astrologyapi.com/v1";
    const apiUserId = "635385";
    const apiKey = "e0d5b714f7697abe3d8f547032736c3707da18b8";
    const authHeader = "Basic " + btoa(`${apiUserId}:${apiKey}`);

    try {
      const response = await fetch(`${apiBaseUrl}/romantic_personality_report/tropical`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCompatibilityReport(result?.report?.join(" ") || "No compatibility report available.");
    } catch (error) {
      console.error("Error fetching compatibility report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Compatibility Analysis</h3>
      <form>
        <label>
          Partner's Birth Date:
          <input type="date" name="birthDate" onChange={handleInputChange} />
        </label>
        <label>
          Partner's Birth Time:
          <input type="time" name="birthTime" onChange={handleInputChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" onChange={handleInputChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" onChange={handleInputChange} />
        </label>
        <label>
          Timezone:
          <input type="number" step="0.01" name="tzone" onChange={handleInputChange} />
        </label>
        <button type="button" onClick={fetchCompatibility}>
          Get Compatibility Report
        </button>
      </form>
      {loading ? (
        <p>Loading compatibility report...</p>
      ) : (
        <div>
          <h4>Compatibility Report</h4>
          <p>{compatibilityReport}</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityAnalysis;
