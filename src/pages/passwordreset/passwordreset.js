import React, { useState } from "react";
import { auth } from "../../firebase"; // Import your Firebase config
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 mt-3 pt-3 pb-3">
          {notice && (
            <div className="alert alert-info" role="alert">
              {notice}
            </div>
          )}
          <form onSubmit={handlePasswordReset}>
            <div className="form-floating mb-3">
              <input
                id="resetEmail"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="resetEmail">Enter your email address</label>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <span>
              Remember your password? <Link to="/login">Login here.</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
