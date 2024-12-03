import React, { useState } from "react";
import { auth } from "../../firebase"; // Import your Firebase config
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import "./passwordreset.css"; 

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (email === "") {
      setNotice("Please enter an email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setNotice("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setNotice("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handlePasswordReset}>
        {notice && (
          <div className="notice">
            {notice}
          </div>
        )}
        <div className="input-group">
          <label htmlFor="resetEmail">Enter your email address</label>
          <input
            id="resetEmail"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Reset Password</button>
        <div className="login-link">
          Remember your password? <Link to="/login">Login here.</Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
