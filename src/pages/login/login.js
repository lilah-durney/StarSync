import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const [isResetLinkVisible, setIsResetLinkVisible] = useState(false); // New state for reset link visibility

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            navigate("/userhome");
        } catch (error) {
            setNotice("You entered a wrong username or password.");
            setIsResetLinkVisible(true); // Show the reset link on failure
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={loginWithUsernameAndPassword}>
                {notice && (
                    <div className="notice">
                        {notice}
                    </div>
                )}
                <div className="input-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>

                {isResetLinkVisible && (
                    <div className="reset-link">
                        <p>
                            Forgot your password? Reset it <Link to="/passwordreset">here</Link>.
                        </p>
                    </div>
                )}

                <div className="signup-link">
                    New to StarSync? Sign up <Link to="/signup">here</Link>.
                </div>
            </form>
        </div>
    );
};

export default Login;
