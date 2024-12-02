import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import "./inputprofile.css";

const InputProfile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    if (!user) {
        navigate("/login");
        return null; // Return nothing while redirecting
    }
    
    return (
        <div className="input-profile-container">
            <div className="input-profile-content">
                <p>
                    Welcome <em>{user.email}</em>. Input birthday info on this page.
                </p>
            </div>
        </div>
    );
};

export default InputProfile;
