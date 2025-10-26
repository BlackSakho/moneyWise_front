import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import ForgotPasswordPage from './pages/Auth/ForgotPassword';
import Header from "./components/Header/index";
import Footer from "./components/Footer/index"



function App() {


  return (
     <div>
      <Header/>
      <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      </Routes>
      </Router>
      <Footer/>

    </div>
  )
}

export default App
