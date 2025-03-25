import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Home.css"; 
import { Switch } from "antd";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [bloodRequests, setBloodRequests] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));

        const fetchBloodRequests = async () => {
            try {
                const response = await fetch("https://life-link-blood-donation-system-server-indol.vercel.app/donor/bloodRequests");
                const data = await response.json();
                
                if (data.success) {
                    setBloodRequests(data.data);
                } else {
                    console.error("Failed to fetch blood requests");
                }
            } catch (error) {
                console.error("Error fetching blood requests:", error);
            }
        };

        fetchBloodRequests();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const handleRequestClick = (request) => {
        navigate(`/home/requestPage/${request._id}`, { state: { request } });
    };

    return (
        <div className="home-container">
            <h1>Welcome, {loggedInUser}</h1>
            <div className="availability-switch">
                <Switch
                    checked={isAvailable}
                    onChange={(checked) => setIsAvailable(checked)} // Update state on toggle
                    checkedChildren="available"
                    unCheckedChildren="not available"
                />
            </div>
            {/* Blood Requests Section */}
            <div className="blood-requests">
            <h2>Blood Requests</h2>
            {bloodRequests.length > 0 ? (
                <ul>
                    {bloodRequests.map((request, index) => (
                        <li key={index}>
                            <button className="blood-request-button"
                                onClick={() => handleRequestClick(request)}>
                                <strong>Blood Group:</strong> {request.bloodGroup} <br />
                                <strong>Patient Name:</strong> {request.patientName} <br />
                                <strong>Hospital:</strong> {request.hospitalName} <br />
                                <strong>City:</strong> {request.location}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blood requests available.</p>
            )}
        </div>

            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
