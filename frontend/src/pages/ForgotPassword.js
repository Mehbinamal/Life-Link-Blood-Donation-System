import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ForgotPassword (){

    const [ emailInfo,SetEmailInfo] = useState({
        email :''
    })
    const navigate = useNavigate();

    const handlechange = (e) =>{
        const { name,value } = e.target;
        const copyEmailInfo = { ...emailInfo};
        copyEmailInfo[name] = value;
        SetEmailInfo(copyEmailInfo);
    }

    const handleForgotPassword = async (e) =>{
        e.preventDefault();

        const { email } = emailInfo;
        if(!email){
            return handleError('email Required');
        }

        try {
            const url = 'https://life-link-blood-donation-system-server-indol.vercel.app/auth/ForgotPassword';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body : JSON.stringify(emailInfo)
            });
            const result = await response.json();
            const { success,message,error} = result;
            if (success){
                handleSuccess(message);
                setTimeout(() =>{
                    navigate('/welcome')
                },1000)
            }else if (error){
                const details = error?.details[0].message;
                handleError(details);
            }else if (!success) {
                handleError(message);
            }
        } catch (error) {
            handleError();
        }
    }
    return(
        <div className="Forgot Password">
            <h1>Forgot Password</h1>
            <form onSubmit={handleForgotPassword}>
                <div>
                <label htmlFor="email">Email</label>
                    <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={emailInfo.email}
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default ForgotPassword; 