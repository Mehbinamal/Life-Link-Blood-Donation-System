import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import './DetailedRequest.css';

function DetailedRequest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`https://life-link-blood-donation-system-server-indol.vercel.app/donor/detailedRequest/${id}`);
                setRequestData(response.data.data);
            } catch (err) {
                setError("Failed to fetch request details");
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id]);

    const handleAccept = async () => {
        try {
            await axios.post(`http://localhost:8080/donor/acceptRequest/${id}`);
            handleSuccess("Request accepted successfully");
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (err) {
            handleError("Failed to accept request");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="detailed-request-container">
            <h2>Blood Request Details</h2>
            {requestData ? (
                <div className="request-details">
                    <p><strong>Patient Name:</strong> {requestData.patientName}</p>
                    <p><strong>Age:</strong> {requestData.patientAge}</p>
                    <p><strong>Hospital:</strong> {requestData.hospitalName}</p>
                    <p><strong>Blood Group:</strong> {requestData.bloodGroup}</p>
                    <p><strong>Units Required:</strong> {requestData.unitsRequired}</p>
                    <p><strong>Urgency Level:</strong> {requestData.urgencyLevel}</p>
                    <p><strong>ByStander Name:</strong> {requestData.byStanderName}</p>
                    <p><strong>Contact Number:</strong> {requestData.contactNumber}</p>
                    <p><strong>Email:</strong> {requestData.byStanderEmail}</p>
                    <p><strong>Location:</strong> {requestData.location}</p>
                    <p><strong>Status:</strong> {requestData.status}</p>
                    <div className="button-container">
                        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                        <button className="accept-button" onClick={handleAccept}>Accept</button>
                    </div>
                </div>
            ) : (
                <p>No details available</p>
            )}
            <ToastContainer />
        </div>
        
    );
}

export default DetailedRequest;
