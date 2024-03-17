import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
     <div className="page">
     <Header/>
     <Routes>
            <Route path="/signin" element={<Login/>} />
            <Route path="/signup" element={<Register/>} />
            /</Routes>
     
     <Footer/>
    </div>
    </>
  )
}

export default App
