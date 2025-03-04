import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './Styles/ForgotPassword.css';

function ForgotPassword (){

    const [emailInfo, setEmailInfo] = useState({ email: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmailInfo({ ...emailInfo, [e.target.name]: e.target.value });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!emailInfo.email) {
            return handleError('Email Required');
        }

        setLoading(true); // Start loading animation

        try {
            const url = 'https://life-link-blood-donation-system-server-indol.vercel.app/auth/ForgotPassword';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailInfo),
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/welcome'), 1000);
            } else {
                handleError(result.error?.details[0]?.message || result.message);
            }
        } catch (error) {
            handleError('Something went wrong!');
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="password-container">
            <div className="password-box">
                <h1>Forgot Password</h1>
                <form onSubmit={handleForgotPassword}>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={emailInfo.email}
                        required
                    />
                    <button type="submit" className={`password-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="loading"></div> : "Reset Password"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
