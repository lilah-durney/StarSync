import React from 'react';
import "./navbar.css";
import {Link} from "react-router-dom"



function NavBar() {

    return (
        <nav className = "navbar">
                    <Link to = "/home">Home</Link>
                    <Link to = "/compatibility">Compatibility Test</Link>
        </nav>

        

    )

    
}


export default NavBar