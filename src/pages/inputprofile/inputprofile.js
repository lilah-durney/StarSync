import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import {doc, getDoc, setDoc, db} from '../../firebase';
import './inputprofile.css'; 
import { onAuthStateChanged } from 'firebase/auth';

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
  const [birthCity, setBirthCity] = useState('');
  const [birthState, setBirthState] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');


  useEffect(() => {
    // Redirect to login if the user is not authenticated
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsuscribe();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      console.error("No user authenticated");
      return;
    } else {
      console.log("User is authenticated");
    }

   
    
    const userId = auth.currentUser.uid;

    const userProfile = {name, birthCity, birthState, birthDate, birthTime} 
    
    console.log("userID:", userId)
    console.log("userProfile:", userProfile);
    try {
      await setDoc(
        doc(db, "users", userId),
       userProfile, 
       { merge: true} 
      );
      console.log("Successfully saved profile to database.")
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Added profile:", docSnap.data());
      } else {
        console.log("No such document");
      }



    } catch(error) {
      console.error("Error saving user profile:", error);
      
    }

    navigate("/home");
  };


  return (
    <div className="input-profile-container">
      <div className="input-profile-content">
        <h1 className="title">StarSync</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-group">
            <label htmlFor="name">My name is</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthCity">I was born in</label>
            <input
              type="text"
              id="birthCity"
              value={birthCity}
              onChange={(e) => setBirthCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthState"></label>
            <input
              type="text"
              id="birthState"
              value={birthState}
              onChange={(e) => setBirthState(e.target.value)}
              placeholder="State"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">on</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthTime">at</label>
            <input
              type="time"
              id="birthTime"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="generate-chart-button">
            Generate Chart
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputProfile;