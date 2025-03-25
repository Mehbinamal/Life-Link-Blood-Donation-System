import React, { useState } from 'react';
import axios from 'axios';
import './UpdateLastDonationDate.css';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

function UpdateLastDonationDate() {
    const [newDonationDate, setNewDonationDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Get logged-in user's email from localStorage
    const loggedInUser = localStorage.getItem('email');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.put(
                `https://life-link-blood-donation-system-server-indol.vercel.app/donor/updateLastDonationDate/${loggedInUser}`,
                { newDonationDate }
            );

            if (response.data.success) {
                handleSuccess('Last donation date updated successfully!');
            } else {
                handleError(response.data.message);
            }
        } catch (error) {
            handleError('Failed to update donation date. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-container">
            <h2 className="title">Update Last Donation Date</h2>
            <form onSubmit={handleSubmit} className="update-form">
                <label htmlFor="donationDate">Select New Donation Date:</label>
                <input
                    type="date"
                    id="donationDate"
                    value={newDonationDate}
                    onChange={(e) => setNewDonationDate(e.target.value)}
                    required
                />
                <button type="submit" className="update-btn" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Date'}
                </button>
            </form>

            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <ToastContainer />
        </div>
    );
}

export default UpdateLastDonationDate;
