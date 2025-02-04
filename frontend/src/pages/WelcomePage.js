import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage (){
    const navigate = useNavigate();
    return(
        <div>
            <button onClick={() => navigate('/login')}> Donor </button>
            <button onClick={() => navigate('/recipient')}> Recipient </button>
        </div>
    )
}

export default WelcomePage;  