import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams();  
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            handleError("Passwords do not match!");
            return;
        }

        try {
            console.log('await');
            const response = await axios.post(`https://life-link-blood-donation-system-server-indol.vercel.app/auth/resetPassword/${token}`, {
                newPassword,
                confirmPassword
            });
            console.log('response');
            console.log('success');
            if(response.data.success){
                console.log('success');
                handleSuccess(response.data.message);
            }else{
                console.log('fail');
                handleError(response.data.message);
            }
            

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
                <button type="submit">Reset Password</button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default ResetPassword;
