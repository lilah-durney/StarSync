import React from 'react';
import "./navbar.css";
import {Link, useNavigate} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";



function NavBar() {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async(e) => {
        e.preventDefault();

        await signOut(auth);
        navigate('/')
    }

    //Only show navbar if the user is logged in. 
    return user ? (
        <nav className = "navbar">
            <Link to = "/userhome">Home</Link>
            <Link to = "/compatibility">Compatibility Test</Link>
            <Link to = "#" onClick={logoutUser}>Logout</Link>
        </nav>
    ) : null;



    
}


export default NavBar