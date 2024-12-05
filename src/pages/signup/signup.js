import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");

    

    // Map Firebase error codes to user-friendly messages
    const errorMessages = {
        "auth/email-already-in-use": "Email already in use. Please try another email.",
        "auth/invalid-email": "Invalid email address. Please enter a valid email.",
        "auth/weak-password": "Weak password. Password should be at least 6 characters.",
        "auth/network-request-failed": "Network error. Please check your connection.",
        "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
    };

    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        // Check for matching passwords
        if (password !== confirmPassword) {
            setNotice("Passwords don't match. Please try again.");
            return;
        }

        // Check for valid password length
        if (password.length < 6) {
            setNotice("Password must be at least 6 characters.");
            return;
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setNotice("Please enter a valid email address.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signup successful");
            navigate("/inputprofile");
        } catch (error) {
            console.error("Firebase Error:", error.code, error.message);
            const userFriendlyMessage = errorMessages[error.code] || "An unexpected error occurred. Please try again.";
            setNotice(userFriendlyMessage);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={signupWithUsernameAndPassword}>
                {notice && (
                    <div className="notice">
                        {notice}
                    </div>
                )}
                <div className="input-group">
                    <label htmlFor="signupEmail">Enter email address</label>
                    <input
                        id="signupEmail"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="signupPassword">Password</label>
                    <input
                        id="signupPassword"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Signup</button>
                <div className="login-link">
                    Go back to login? <Link to="/login">Click here.</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
