import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./userhome.css";

const UserHome = () => {
  const location = useLocation();
  const { userInfo } = location.state || {};

  const [chartUrl, setChartUrl] = useState("");
  const [houses, setHouses] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [personalityReport, setPersonalityReport] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        const apiBaseUrl = "https://json.astrologyapi.com/v1";
        const userId = "635385"; // Replace with your Astrology API user ID
        const apiKey = "e0d5b714f7697abe3d8f547032736c3707da18b8"; // Replace with your API key
        const auth = "Basic " + btoa(`${userId}:${apiKey}`);

        const data = {
          day: userInfo.day,
          month: userInfo.month,
          year: userInfo.year,
          hour: userInfo.hour,
          min: userInfo.minute,
          lat: userInfo.latitude || 0.0,
          lon: userInfo.longitude || 0.0,
          tzone: userInfo.timezone || 0.0,
        };

        try {
          // Fetch Natal Chart
          const chartResponse = await fetch(`${apiBaseUrl}/natal_wheel_chart`, {
            method: "POST",
            headers: {
              Authorization: auth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const chartResult = await chartResponse.json();
          if (chartResult.chart_url) {
            setChartUrl(chartResult.chart_url);
          }

          // Fetch Houses
          const housesResponse = await fetch(`${apiBaseUrl}/house_cusps/tropical`, {
            method: "POST",
            headers: {
              Authorization: auth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const housesResult = await housesResponse.json();
          if (housesResult?.houses && Array.isArray(housesResult.houses)) {
            setHouses(housesResult.houses);
          }

          // Fetch Planets
          const planetsResponse = await fetch(`${apiBaseUrl}/planets/tropical`, {
            method: "POST",
            headers: {
              Authorization: auth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const planetsResult = await planetsResponse.json();
          if (Array.isArray(planetsResult)) {
            setPlanets(planetsResult);
          }

          // Fetch Personality Report
          const personalityResponse = await fetch(
            `${apiBaseUrl}/personality_report/tropical`,
            {
              method: "POST",
              headers: {
                Authorization: auth,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const personalityResult = await personalityResponse.json();
          if (personalityResult?.report) {
            setPersonalityReport(personalityResult.report.join(" "));
          }
        } catch (error) {
          console.error("Error during API calls:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="user-home-container">
      <div className="user-home-header">
        <h2>Hello, {userInfo?.name}</h2>
        <p>
          {userInfo?.city}, {userInfo?.state}, born on {userInfo?.month}/
          {userInfo?.day}/{userInfo?.year} at {userInfo?.hour}:{userInfo?.minute}.
        </p>
      </div>
      {loading ? (
        <div className="loading">
          <p>Loading natal chart and data...</p>
        </div>
      ) : (
        <>
          <div className="main-content">
            <div className="chart-container">
              {chartUrl ? (
                <img src={chartUrl} alt="Natal Chart" className="chart-image" />
              ) : (
                <p>No chart available.</p>
              )}
            </div>
            <div className="tables-container">
              <div className="table-container">
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
              <div className="table-container">
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
          </div>
          <div className="report-container">
            <h3>Personality Report</h3>
            <p>{personalityReport || "No personality report available."}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;
