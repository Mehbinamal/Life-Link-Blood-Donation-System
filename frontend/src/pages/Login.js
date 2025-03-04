import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

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

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email,password} = loginInfo;
        if(!email || !password){
            return handleError('All Fields Required');
        }
        try {
            const url = 'https://life-link-blood-donation-system-server-indol.vercel.app/auth/Login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body : JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success,message ,jwtToken,name,error} = result;
            if (success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(() =>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError();
        }
    }
    return(
        <div className="loginPage">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                        placeholder="Enter Your password"
                        value={loginInfo.password}
                    />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an Account ? 
                    <Link to = "/signup"> Signup </Link>
                </span>
                <span>Forgot Password? 
                    <Link to = "/forgotPassword"> Forgot Password </Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login;