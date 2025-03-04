import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup(){

    const [ SignupInfo,setSignupInfo] = useState({
        name:'',
        email:'',
        password:'',
        mobileNo:'',
        gender:'',
        bloodGroup:'',
        lastDonationDate:'',
        address:'',
        city:'',
        pincode:''
    })

    const handlechange = (e) => {
        const { name,value } = e.target;
        const copySignupInfo = { ...SignupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const {name,email,password,mobileNo,bloodGroup,gender,address,city,pincode} = SignupInfo;
        if(!name || !email || !password || !mobileNo || !bloodGroup || !gender || !address || !city || !pincode){
            return handleError('All Fields Required');
        }
        try {
            const url = 'https://life-link-blood-donation-system-server-indol.vercel.app/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body : JSON.stringify(SignupInfo)
            });
            const result = await response.json();
            const { success,message ,error} = result;
            if (success){
                handleSuccess(message);
                setTimeout(() =>{
                    navigate('/login')
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
                <div>
                    <label htmlFor="mobileNo">Mobile Number</label>
                    <input
                        onChange={handlechange}
                        type="mobileNo"
                        name="mobileNo"
                        placeholder="Enter Your Mobile Number"
                        value={SignupInfo.mobileNo}
                    />
                </div>
                <div>
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <input
                        onChange={handlechange}
                        type="bloodGroup"
                        name="bloodGroup"
                        placeholder="Enter Your Blood Group"
                        value={SignupInfo.bloodGroup}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <input
                        onChange={handlechange}
                        type="gender"
                        name="gender"
                        placeholder="Enter Your Gender"
                        value={SignupInfo.gender}
                    />
                </div>
                <div>
                    <label htmlFor="lastDonationDate">last Donation Date</label>
                    <input
                        onChange={handlechange}
                        type="lastDonationDate"
                        name="lastDonationDate"
                        placeholder="Enter Your Last Donation Date (if any)"
                        value={SignupInfo.lastDonationDate}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        onChange={handlechange}
                        type="address"
                        name="address"
                        placeholder="Enter Your address"
                        value={SignupInfo.address}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        onChange={handlechange}
                        type="city"
                        name="city"
                        placeholder="Enter Your city"
                        value={SignupInfo.city}
                    />
                </div>
                <div>
                    <label htmlFor="Pincode">Pincode</label>
                    <input
                        onChange={handlechange}
                        type="pincode"
                        name="pincode"
                        placeholder="Enter Your pincode"
                        value={SignupInfo.pincode}
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