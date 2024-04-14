import './App.css';
import Login from './pages/Login/Login'
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile';
function App() {
  const {user} = useSelector((state)=>state.authReducer.authdata);
  // let user;
  

  return (
    <>
      <div className='app'>
        <div className="blurLeft"></div>
        <div className="blurRight"></div>
        <Routes>
          <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
          <Route path='/auth' element={user ? <Navigate to ='/home'/> : <Login/>} />
          <Route path='/home' element={user?<Home/> : <Navigate to ='/auth'/> }/>
          <Route path ='profile/:id' element={user? <Profile/>: <Navigate to='/auth'/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
