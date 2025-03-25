import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonationHistory.css';


function DonationHistory() {
    const [donationHistory, setDonationHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get logged-in user's email from localStorage
    const loggedInUser = localStorage.getItem('email');

    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                const response = await axios.get(
                    `https://life-link-blood-donation-system-server-indol.vercel.app/donor/donationHistory/${loggedInUser}`
                );

                if (response.data.success) {
                    setDonationHistory(response.data.donationHistory);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Failed to fetch donation history.');
            } finally {
                setLoading(false);
            }
        };

        if (loggedInUser) {
            fetchDonationHistory();
        } else {
            setError('No logged-in user found.');
            setLoading(false);
        }
    }, [loggedInUser]);

    return (
        <div className="container">
            <h2 className="title">Donation History</h2>

            {loading ? (
                <p className="loading">Loading donation history...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : donationHistory.length === 0 ? (
                <p className="no-history">No donation history found.</p>
            ) : (
                <div className="history-list">
                    {donationHistory.map((history, index) => (
                        <div key={history._id} className="history-item">
                            <h3>
                                Request ID: <span>{history.requestId?._id || 'N/A'}</span>
                            </h3>
                            <p>
                                <strong>Blood Group:</strong> {history.requestId?.bloodGroup || 'N/A'}
                            </p>
                            <p>
                                <strong>Recipient Name:</strong> {history.requestId?.patientName || 'N/A'}
                            </p>
                            <p>
                                <strong>Hospital Name:</strong> {history.requestId?.hospitalName || 'N/A'}
                            </p>
                            <p>
                                <strong>Status:</strong>{' '}
                                <span
                                    className={
                                        history.requestId?.status === 'Completed'
                                            ? 'status-completed'
                                            : 'status-pending'
                                    }
                                >
                                    {history.requestId?.status || 'N/A'}
                                </span>
                            </p>
                            <p>
                                <strong>Donation Date:</strong>{' '}
                                {new Date(history.donationDate).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DonationHistory;
