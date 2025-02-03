import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

function Signup(){

    const [ SignupInfo,setSignupInfo] = useState({
        name:'',
        email:'',
        password:'',
    })

    const handlechange = (e) => {
        const { name,value } = e.target;
        const copySignupInfo = { ...SignupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    
    const handleSignup = async (e) => {
        e.preventDefault();
        const {name,email,password} = SignupInfo;
        if(!name || !email || !password){
            return handleError('All Fields Required');
        }
        try {
            const url = 'http://localhost:8080/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body : JSON.stringify(SignupInfo)
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            handleError();
        }
    }
    return(
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handlechange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter Your Name"
                        value={SignupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={SignupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handlechange}
                        type="password"
                        name="password"
                        placeholder="Enter Your password"
                        value={SignupInfo.password}
                    />
                </div>
                <button type="submit">Signup</button>
                <span>Already have an Account ? 
                    <Link to = "/login"> Login </Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup;