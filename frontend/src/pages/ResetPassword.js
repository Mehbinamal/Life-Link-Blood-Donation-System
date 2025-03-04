import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import './Styles/ForgotPassword.css';

const ResetPassword = () => {
    const { token } = useParams();  
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            handleError("Passwords do not match!");
            return;
        }

        setLoading(true); // Start loading effect

        try {
            const response = await axios.post(`https://life-link-blood-donation-system-server-indol.vercel.app/auth/resetPassword/${token}`, {
                newPassword,
                confirmPassword
            });

            if(response.data.success){
                handleSuccess(response.data.message);
                setTimeout(() => {
                    navigate("/login"); 
                }, 3000);
            } else {
                handleError(response.data.message);
            }
        } catch (err) {
            handleError(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false); // Stop loading effect
        }
    };

    return (
        <div className="password-container">
            <div className="password-box">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <br />
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit" className={`password-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="loading"></div> : "Reset Password"}
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ResetPassword;
