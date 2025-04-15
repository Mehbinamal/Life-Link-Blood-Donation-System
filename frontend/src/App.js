import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RequestForm from './pages/Recipient/RequestForm';
import DetailedRequest from './pages/Donor/DetailedRequest';
import DonationHistory from './pages/Donor/DonationHistory';
import UpdateLastDonationDate from './pages/Donor/UpdateLastDonationDate';
import About from './pages/Donor/About';
import RefreshHandler from './RefreshHandler';
import PrivateRoute from './components/privateRoutes';
import './App.css';
import UpdatePassword from './pages/Donor/UpdatePassword';
import SearchBloodRequest from './pages/Recipient/SearchBloodRequest';

function App() {
  const location = useLocation();
  const showNavbar = ["/home"].includes(location.pathname);
  const [, setIsAuthenticated] = useState(false); // Removed unused isAuthenticated

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/searchBloodRequest" element={<SearchBloodRequest/>}/>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/requestBlood" element={<RequestForm />} />
          <Route path="/home/requestPage/:id" element={<DetailedRequest />} />
          <Route path="/donationhistory" element={<DonationHistory />} />
          <Route path="/updatedonationhistory" element={<UpdateLastDonationDate />} />
          <Route path="/updatePassword" element = {<UpdatePassword />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
