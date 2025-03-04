import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import './Styles/Signup.css';

function Signup() {
    const [SignupInfo, setSignupInfo] = useState({
        name: '', email: '', password: '', mobileNo: '',
        gender: '', bloodGroup: '', lastDonationDate: '',
        address: '', city: '', pincode: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignupInfo({ ...SignupInfo, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const { name, email, password, mobileNo, bloodGroup, gender, address, city, pincode } = SignupInfo;
        if (!name || !email || !password || !mobileNo || !bloodGroup || !gender || !address || !city || !pincode) {
            setLoading(false);
            return handleError('All Fields Required');
        }

        try {
            const url = 'https://life-link-blood-donation-system-server-indol.vercel.app/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(SignupInfo)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.error?.details[0]?.message || result.message);
            }
        } catch (error) {
            handleError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <label>Name</label>
                    <input onChange={handleChange} type="text" name="name" placeholder="Enter Your Name" value={SignupInfo.name} />

                    <label>Email</label>
                    <input onChange={handleChange} type="email" name="email" placeholder="Enter Your Email" value={SignupInfo.email} />

                    <label>Password</label>
                    <input onChange={handleChange} type="password" name="password" placeholder="Enter Your Password" value={SignupInfo.password} />

                    <label>Mobile Number</label>
                    <input onChange={handleChange} type="text" name="mobileNo" placeholder="Enter Your Mobile Number" value={SignupInfo.mobileNo} />

                    <label>Gender</label>
                    <select name="gender" onChange={handleChange} value={SignupInfo.gender}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Blood Group</label>
                    <select name="bloodGroup" onChange={handleChange} value={SignupInfo.bloodGroup}>
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>

                    <label>Last Donation Date</label>
                    <input onChange={handleChange} type="date" name="lastDonationDate" value={SignupInfo.lastDonationDate} />

                    <label>Address</label>
                    <input onChange={handleChange} type="text" name="address" placeholder="Enter Your Address" value={SignupInfo.address} />

                    <label>City</label>
                    <input onChange={handleChange} type="text" name="city" placeholder="Enter Your City" value={SignupInfo.city} />

                    <label>Pincode</label>
                    <input onChange={handleChange} type="text" name="pincode" placeholder="Enter Your Pincode" value={SignupInfo.pincode} />

                    <button type="submit" className={`signup-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="loading"></div> : "Signup"}
                    </button>

                    <span className="signup-footer">Already have an account? <Link to="/login">Login</Link></span>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;

