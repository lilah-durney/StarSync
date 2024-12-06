import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./userhome.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [chartUrl, setChartUrl] = useState("");
  const [houses, setHouses] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [personalityReport, setPersonalityReport] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserInfo = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          navigate("/login"); // Redirect to login if not authenticated
        } else {
          const userId = user.uid;
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
          } else {
            navigate("/inputprofile"); // Redirect to input profile if no data
          }
        }
      });
    };

    fetchUserInfo();
  }, [navigate]);

  // Fetch Astrology API Data
  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) return;

      setLoading(true);

      const { birthDate, birthTime, lat, lon, tzone } = userInfo;

      const data = {
        day: parseInt(birthDate.split("-")[2]),
        month: parseInt(birthDate.split("-")[1]),
        year: parseInt(birthDate.split("-")[0]),
        hour: parseInt(birthTime.split(":")[0]),
        min: parseInt(birthTime.split(":")[1]),
        lat: lat || 0.0,
        lon: lon || 0.0,
        tzone: tzone || 0.0,
      };
      console.log("Sending request to API with data:", data);

      const apiBaseUrl = "https://json.astrologyapi.com/v1";
      const apiUserId = "635385";
      const apiKey = "e0d5b714f7697abe3d8f547032736c3707da18b8";
      const authHeader = "Basic " + btoa(`${apiUserId}:${apiKey}`);

      try {
        // Fetch Natal Chart
        const chartResponse = await fetch(`${apiBaseUrl}/natal_wheel_chart`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const chartResult = await chartResponse.json();
        setChartUrl(chartResult.chart_url || "");

        // Fetch Houses
        const housesResponse = await fetch(`${apiBaseUrl}/house_cusps/tropical`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const housesResult = await housesResponse.json();
        setHouses(housesResult.houses || []);

        // Fetch Planets
        const planetsResponse = await fetch(`${apiBaseUrl}/planets/tropical`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const planetsResult = await planetsResponse.json();
        setPlanets(planetsResult || []);

        // Fetch Personality Report
        const personalityResponse = await fetch(
          `${apiBaseUrl}/personality_report/tropical`,
          {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const personalityResult = await personalityResponse.json();
        setPersonalityReport(personalityResult?.report?.join(" ") || "");
      } catch (error) {
        console.error("Error fetching data from API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  return (
    <div>
      <div className="user-home-header">
        <h2>Hello, {userInfo?.name}</h2>
        <p>
          {userInfo?.birthCity}, {userInfo?.birthState}, born on{" "}
          {userInfo?.birthDate} at {userInfo?.birthTime}.
        </p>
      </div>
      {loading ? (
        <div className="loading">
          <p>Loading natal chart and data...</p>
        </div>
      ) : (
        <div className="main-content">
          <div className="chart-tables-container">
            <div className="table-container-left">
              <h3>Houses</h3>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>House</th>
                    <th>Sign</th>
                    <th>Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {houses.map((house, index) => (
                    <tr key={index}>
                      <td>{house.house}</td>
                      <td>{house.sign}</td>
                      <td>{house.degree.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              {chartUrl ? (
                <img src={chartUrl} alt="Natal Chart" className="chart-image" />
              ) : (
                <p>No chart available.</p>
              )}
            </div>
            <div className="table-container-right">
              <h3>Planets</h3>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Planet</th>
                    <th>Sign</th>
                    <th>House</th>
                    <th>Retrograde</th>
                  </tr>
                </thead>
                <tbody>
                  {planets.map((planet, index) => (
                    <tr key={index}>
                      <td>{planet.name}</td>
                      <td>{planet.sign}</td>
                      <td>{planet.house}</td>
                      <td>{planet.retrograde ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="report-container">
            <h3>Personality Report</h3>
            <p>{personalityReport || "No personality report available."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
