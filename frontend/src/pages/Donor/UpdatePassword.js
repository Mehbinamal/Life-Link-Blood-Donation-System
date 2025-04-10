import React, { useState } from "react";
import axios from 'axios';
import { handleSuccess,handleError } from '../../utils';
import { useNavigate } from 'react-router-dom';
import '../Styles/ForgotPassword.css';
import { ToastContainer } from "react-toastify";

function UpdatePassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      handleError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/auth/updatePassword',
        { 
          email,
          newPassword,
          confirmPassword
        }
      );

      if (response.data.success){
        handleSuccess(response.data.message);
        setTimeout(() => {
            navigate("/home")
        }, 3000);
      } else {
        handleError(response.data.message);
      }
    } catch (err) {
        handleError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='password-container'>
      <div className='password-box'>
        <h2>Change Password</h2>
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
          <button className="back-button" onClick={() => navigate("/home")}>Back</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default UpdatePassword
