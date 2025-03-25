import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import './Styles/Login.css'

function Login(){

    const [ loginInfo,setLoginInfo] = useState({
        email:'',
        password:'',
    })

    const handlechange = (e) => {
        const { name,value } = e.target;
        const copyLoginInfo = { ...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const { email, password } = loginInfo;
        if (!email || !password) {
            handleError('All Fields Required');
            return; // Don't set loading state if validation fails
        }
    
        setLoading(true); // Set loading before the API call
    
        try {
            const url = 'https://life-link-blood-donation-system-server-indol.vercel.app/auth/Login';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
    
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
    
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('email',loginInfo.email);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                handleError(error?.details[0]?.message || message);
            }
        } catch (error) {
            handleError('Something went wrong!');
        } finally {
            setLoading(false); // Ensure loading is stopped after API response
        }
    };
    
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handlechange}
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={loginInfo.password}
                    />
                </div>
                <button type="submit" className={`login-button ${loading ? "loading" : ""}`} disabled={loading}>
                    {loading ? <div className="loading"></div> : "Login"}
                </button>
                <span className="login-links">
                    Don't have an Account? <Link to="/signup"> Signup </Link>
                </span>
                <span className="login-links">
                    Forgot Password? <Link to="/forgotPassword"> Forgot Password </Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
    
}

export default Login;