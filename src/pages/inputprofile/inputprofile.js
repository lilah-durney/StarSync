import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { doc, getDoc, setDoc, db } from "../../firebase";
import "./inputprofile.css";
import { onAuthStateChanged } from "firebase/auth";

const InputProfile = () => {
  const [name, setName] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [birthState, setBirthState] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [latitude, setLatitude] = useState(""); // New state
  const [longitude, setLongitude] = useState(""); // New state
  const [timezone, setTimezone] = useState(""); // New state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        // Check if user data exists
        const userId = user.uid;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          navigate("/userhome"); // Redirect to UserHome if data exists
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      console.error("No user authenticated");
      return;
    }
  
    const userId = auth.currentUser.uid;
  
    // Ensure all required parameters for API calls are captured
    const userProfile = {
        name,
        birthCity,
        birthState,
        birthDate, // Save the full date as a string (e.g., "YYYY-MM-DD")
        birthTime, // Save the full time as a string (e.g., "HH:mm")
        lat: parseFloat(latitude) || 0.0,
        lon: parseFloat(longitude) || 0.0,
        tzone: parseFloat(timezone) || 0.0,
      };
      console.log("User profile being saved:", userProfile);

      
  
    try {
      await setDoc(doc(db, "users", userId), userProfile, { merge: true });
      console.log("Successfully saved profile to database.");
      navigate("/userhome");
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };
  

  return (
    <div className="input-profile-container">
      <div className="input-profile-content">
        <h1 className="title">StarSync</h1>
        <form
  className="two-line-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
>
  <div className="form-row">
    <label className="inline-label">
      <span className="label-text">My name is</span>
      <input
        type="text"
        className="inline-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
    </label>
  </div>
  <div className="form-row">
    <label className="inline-label">
      <span className="label-text">I was born in</span>
      <input
        type="text"
        className="inline-input"
        value={birthCity}
        onChange={(e) => setBirthCity(e.target.value)}
        placeholder="City"
        required
      />
      ,
      <input
        type="text"
        className="inline-input"
        value={birthState}
        onChange={(e) => setBirthState(e.target.value)}
        placeholder="State"
        required
      />
    </label>
  </div>
  <div className="form-row">
    <label className="inline-label">
      <span className="label-text">on</span>
      <input
        type="date"
        className="inline-input"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
    </label>
    <label className="inline-label">
      <span className="label-text">at</span>
      <input
        type="time"
        className="inline-input"
        value={birthTime}
        onChange={(e) => setBirthTime(e.target.value)}
        required
      />
    </label>
  </div>
  <div className="button-row">
    <button type="submit" className="generate-chart-button">
      Generate Chart
    </button>
  </div>
</form>


      </div>
    </div>
  );
};

export default InputProfile;
