import React from 'react';
import {  Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RequestForm from './pages/Recipient/RequestForm';
import DetailedRequest from './pages/Donor/DetailedRequest';
import './App.css';

function App() {
  const location = useLocation();
  const showNavbar = ["/home"].includes(location.pathname); // Show Navbar only on Home for now

  return (
    <div className="App">
      {showNavbar && <Navbar />} 
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/requestBlood" element={<RequestForm />} />
        <Route path="/home/requestPage/:id" element={<DetailedRequest />} />
        
        {/* Redirect missing pages to home */}
        <Route path="/reports" element={<Navigate to="/home" />} />
        <Route path="/products" element={<Navigate to="/home" />} />
        <Route path="/profile" element={<Navigate to="/home" />} />
        <Route path="/blood-donation-details" element={<Navigate to="/home" />} />

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}



export default App;
