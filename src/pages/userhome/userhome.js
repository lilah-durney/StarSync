import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './userhome.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [chartUrl, setChartUrl] = useState("");
  const [houses, setHouses] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [personalityReport, setPersonalityReport] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          navigate('/login'); // Redirect to login if not authenticated
        } else {
          const userId = user.uid;
          const docRef = doc(db, 'users', userId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
          } else {
            navigate('/inputprofile'); // Redirect to input profile if no data
          }
        }
      });
    };

    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "users", userId);

        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();

            const birthDate = new Date(userData.birthDate);
            const [hour, min] = userData.birthTime.split(":").map(Number);
            console.log("User Info:", userInfo);
            const data = {
              day: birthDate.getDate(),
              month: birthDate.getMonth() + 1,
              year: birthDate.getFullYear(),
              hour: hour || 0,
              min: min || 0,
              lat: userData.lat || 0.0,
              lon: userData.lon || 0.0,
              tzone: userData.tzone || 0.0,
            };

            const apiBaseUrl = "https://json.astrologyapi.com/v1";
            const apiUserId = "635385";
            const apiKey = "e0d5b714f7697abe3d8f547032736c3707da18b8";
            const authHeader = "Basic " + btoa(`${apiUserId}:${apiKey}`);

            // Fetch natal chart
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

            // Fetch house cusps
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

            // Fetch planets
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

            // Fetch personality report
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
          } else {
            console.error("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data or making API calls:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  // Update document title with user's birthdate and time
  useEffect(() => {
    if (userInfo) {
      const birthDate = new Date(userInfo.birthDate);
      const birthTime = userInfo.birthTime || "00:00";
      const formattedDate = `${birthDate.getMonth() + 1}/${birthDate.getDate()}/${birthDate.getFullYear()}`;
      const title = `User Home - Born on ${formattedDate} at ${birthTime}`;
      document.title = title;
    }
  }, [userInfo]);

  return (
    <>
      <div className="user-home-header">
        <h2>Hello, {userInfo?.name}</h2>
        <p>
  {userInfo?.birthCity}, {userInfo?.birthState}, born on{" "}
  {userInfo?.birthDate || `${userInfo?.month}/${userInfo?.day}/${userInfo?.year}`}{" "}
  at {userInfo?.birthTime || `${userInfo?.hour}:${userInfo?.minute}`}.
</p>

      </div>
      {loading ? (
        <div className="loading">
          <p>Loading natal chart and data...</p>
        </div>
      ) : (
        <>
          <div className="main-content">
            <div className="chart-tables-container">
              {/* Left Table - Houses */}
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
              {/* Chart */}
              <div className="chart-container">
                {chartUrl ? (
                  <img src={chartUrl} alt="Natal Chart" className="chart-image" />
                ) : (
                  <p>No chart available.</p>
                )}
              </div>
              {/* Right Table - Planets */}
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
      {Array.isArray(planets) && planets.length > 0 ? (
        planets.map((planet, index) => (
          <tr key={index}>
            <td>{planet.name}</td>
            <td>{planet.sign}</td>
            <td>{planet.house}</td>
            <td>{planet.retrograde ? "Yes" : "No"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">No data available</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

            </div>
            {/* Personality Report */}
            <div className="report-container">
              <h3>Personality Report</h3>
              <p>{personalityReport || "No personality report available."}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserHome;
