import {Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
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
      </Routes>
    </div>
  );
}

export default App;
