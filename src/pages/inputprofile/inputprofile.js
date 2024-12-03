import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Assuming your Firebase setup is correct
import './inputprofile.css'; // Add custom styles here

const InputProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!auth.currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = () => {
    console.log({ name, birthPlace, birthDate, birthTime });
    // Send this data to the backend or process it as needed
  };

  // Render nothing if the user is not authenticated
  if (!auth.currentUser) {
    return null;
  }

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
            <label htmlFor="birthPlace">I was born in</label>
            <input
              type="text"
              id="birthPlace"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, State"
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
