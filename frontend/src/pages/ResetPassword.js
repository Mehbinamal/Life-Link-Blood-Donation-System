import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";

const ResetPassword = () => {
    const { token } = useParams();  
    const navigate = useNavigate();

    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            handleError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/resetPassword/:token", {
                newpassword,
                confirmPassword
            });

            handleSuccess(response.data.message);

            setTimeout(() => {
                navigate("/login"); 
            }, 3000);

        } catch (err) {
            handleError(err.response?.data?.message || "Something went wrong!");
            
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input
                    type="password"
                    value={password}
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
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
