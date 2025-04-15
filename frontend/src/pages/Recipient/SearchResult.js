import React from 'react';
import './SearchResult.css';

const SearchResult = ({ data, onGoBack }) => {
    return (
        <div className="search-container">
            <h2 className="title">Search Result</h2>
            <div className="result-card">
                <p><strong>Patient Name:</strong> {data.patientName}</p>
                <p><strong>Age:</strong> {data.patientAge}</p>
                <p><strong>Hospital:</strong> {data.hospitalName}</p>
                <p><strong>Blood Group:</strong> {data.bloodGroup}</p>
                <p><strong>Units Required:</strong> {data.unitsRequired}</p>
                <p><strong>Urgency:</strong> {data.urgencyLevel}</p>
                <p><strong>Bystander Name:</strong> {data.byStanderName}</p>
                <p><strong>Contact Number:</strong> {data.contactNumber}</p>
                <p><strong>Email:</strong> {data.byStanderEmail}</p>
                <p><strong>Location:</strong> {data.location}</p>
                <p><strong>Status:</strong> {data.status}</p>
                <p><strong>Requested At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
            </div>
            <button className="update-btn" onClick={onGoBack}>Go Back</button>
        </div>
    );
};

export default SearchResult;
