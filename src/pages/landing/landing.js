import React from 'react';
import "./landing.css";
import { Link } from 'react-router-dom';



function Landing() {
    return (
        <div className="landing">
            
            <div className="hero">
                
                <div className = "astrowheel-container">
            
                    <div className = "main-body">
                        <h1>StarSync</h1>
                        <h3>The sky, but in your pocket.</h3>
                        <Link to="/login" className = "login-button">Login</Link>
                   
                    </div>

                        <img src = "astrowheel.png" alt="astrowheel"/>

                </div>

            </div>

            <div className = "about">
                <h2>Be Your Own Astrologer.</h2>
                <p>StarSync is your gateway to understanding the universe's influence on your relationships. By combining modern technology with 
                    ancient astrological wisdom, we provide detailed birth charts and compatibility reports tailored to you. Whether you're deepening 
                    your self-awareness or exploring how you connect with others, StarSync makes the stars align in your favor.</p>

            </div>

            <div className = "features">
                <div className = "features-grid">
                    <div className = "features-card">
                        <img src="birthchart-report.png" alt ="Birth Chart Report Sun"/>
                        <h2>Birth Chart Report</h2>
                        <p>Unveil the secrets of your astrological DNA. Enter your birthday to receive a detailed birth chart that explains your unique cosmic blueprint.</p>
                    </div>

                    <div className = "features-card">
                        <img src = "compatibility-report.png" alt = "Compatibility Report Sun" />
                        <h2>Compatibility Report</h2>
                        <p>Curious about your connection with someone special? Compare two birth charts to reveal strengths, challenges, and dynamics within your relationship.</p>
                    </div>

                    <div className = "features-card">
                        <img src = "relationship-insights.png" alt = "Relationship Insights Sun"/>
                        <h2>Relationship Insights</h2>
                        <p>Learn how to navigate and nurture your relationships with actionable recommendations tailored to your compatibility results.</p>
                    </div>

                    <div className = "features-card">
                        <img src = "api-powered.png" alt = "API Powered Sun"/>
                        <h2>Powered by AstroData API</h2>
                        <p>We use cutting-edge technology to deliver accurate and meaningful astrological insights based on trusted data.</p>
                    </div>

                </div>
            </div>

            <div className = "tarot-cards">
                <div className = "tarot-grid">
                    <img src = "world-tarot.png" alt = "World Tarot Card"/>
                    <img src = "star-tarot.png" alt = "Star Tarot Card"/>
                    <img src = "lovers-tarot.png" alt = "Lovers Tarot Card"/>
                    <img src = "magician-tarot.png" alt = "Magician Tarot Card"/>
                </div>
            </div>


        </div>
        
    )
}

export default Landing