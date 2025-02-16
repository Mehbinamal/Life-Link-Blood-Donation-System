import {Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Navigate to ="/welcome"/>} />
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/welcome' element = {<WelcomePage/>}/>
        <Route path = '/forgotPassword' element = {<ForgotPassword/>}/>
        <Route path = '/resetPassword/:token' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
