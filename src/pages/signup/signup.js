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

    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Signup successful");
                navigate("/inputprofile");
            } catch {
                setNotice("Sorry, something went wrong. Please try again.");
            }
        } else {
            setNotice("Passwords don't match. Please try again.");
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
