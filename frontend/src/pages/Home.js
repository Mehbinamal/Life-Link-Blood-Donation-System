import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [bloodRequests, setBloodRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));

        // Fetch blood requests
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

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <h2>Blood Requests</h2>
            {bloodRequests.length > 0 ? (
                <ul>
                    {bloodRequests.map((request, index) => (
                        <li key={index}>
                            <strong>Blood Group:</strong> {request.bloodGroup} <br />
                            <strong>Patient Name:</strong> {request.patientName} <br />
                            <strong>Hospital:</strong> {request.hospitalName} <br />
                            <strong>City:</strong> {request.city}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blood requests available.</p>
            )}
        </div>
    );
}

export default Home;
