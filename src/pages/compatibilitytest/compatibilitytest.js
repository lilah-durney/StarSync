import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./compatibilitytest.css";

const CompatibilityTest = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [partnerName, setPartnerName] = useState(""); // Input for partner's name
  const [compatibilityReport, setCompatibilityReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hardcoded partner details for Ben Pham
  const hardcodedPartnerDetails = {
    name: "Ben Pham",
    day: 7,
    month: 7,
    year: 2005,
    hour: 18,
    min: 0,
    lat: 33.7032,
    lon: -117.9937,
    tzone: -7.0, // Pacific Time
  };

  // Fetch current user's information from Firebase
  useEffect(() => {
    const fetchCurrentUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = user.uid;
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          } else {
            setError("No user data found.");
          }
        } else {
          setError("User is not authenticated.");
        }
      });
    };

    fetchCurrentUser();
  }, []);

  const handleCheckCompatibility = async () => {
    if (!currentUser) {
      setError("Current user data is not available.");
      return;
    }

    if (partnerName !== "Ben Pham") {
      setError("No compatibility data available for this name.");
      setCompatibilityReport("");
      return;
    }

    setLoading(true);
    setError("");
    setCompatibilityReport("");

    const { birthDate, birthTime, lat, lon, tzone } = currentUser;

    const data = {
      p_day: parseInt(birthDate.split("-")[2]),
      p_month: parseInt(birthDate.split("-")[1]),
      p_year: parseInt(birthDate.split("-")[0]),
      p_hour: parseInt(birthTime.split(":")[0]),
      p_min: parseInt(birthTime.split(":")[1]),
      p_lat: lat || 0.0,
      p_lon: lon || 0.0,
      p_tzone: tzone || 0.0,
      s_day: hardcodedPartnerDetails.day,
      s_month: hardcodedPartnerDetails.month,
      s_year: hardcodedPartnerDetails.year,
      s_hour: hardcodedPartnerDetails.hour,
      s_min: hardcodedPartnerDetails.min,
      s_lat: hardcodedPartnerDetails.lat,
      s_lon: hardcodedPartnerDetails.lon,
      s_tzone: hardcodedPartnerDetails.tzone,
    };

    const apiBaseUrl = "https://json.astrologyapi.com/v1";
    const apiUserId = "635404"; // Replace with your API user ID
    const apiKey = "f08a8f98a8899b62ea40d9fb218c0c1c7319a1eb"; // Replace with your API key
    const authHeader = "Basic " + btoa(`${apiUserId}:${apiKey}`);

    try {
      const response = await fetch(`${apiBaseUrl}/love_compatibility_report/tropical`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.love_compatibility_report) {
        setCompatibilityReport(result.love_compatibility_report.join(" "));
      } else {
        setError("No compatibility report available.");
      }
    } catch (err) {
      setError("Failed to fetch compatibility report. Please try again later.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compatibility-container">
      <h1>Discover Your Compatibility</h1>
      <p>Enter the name of your partner to check compatibility:</p>
      <input
        type="text"
        placeholder="Enter partner's name"
        value={partnerName}
        onChange={(e) => setPartnerName(e.target.value)}
        className="partner-input"
      />
      <button onClick={handleCheckCompatibility} disabled={loading}>
        {loading ? "Checking..." : "Check Compatibility"}
      </button>
      {error && <p className="error">{error}</p>}
      {compatibilityReport && (
        <div className="report-container">
          <h2>Compatibility Report with {partnerName}</h2>
          <p>{compatibilityReport}</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTest;
