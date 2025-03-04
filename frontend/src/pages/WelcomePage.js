import React from "react";
import { useNavigate } from "react-router-dom";
import './Styles/WelcomePage.css'

function WelcomePage() {
    const navigate = useNavigate();
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">LifeLink Blood Donation System</h1>
            <p className="welcome-subtitle">"Your blood donation can save a life, be a hero today!"</p>
            <div className="welcome-buttons">
                <button className="welcome-button" onClick={() => navigate('/login')}> Donor </button>
                <button className="welcome-button" onClick={() => navigate('/requestBlood')}> Recipient </button>
            </div>
            <p className="welcome-quotes">
                "A single pint can save three lives, a single gesture can create a million smiles."
            </p>
        </div>
    );
}


export default WelcomePage;  