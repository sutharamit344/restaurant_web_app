import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import React from "react";
import Loginform from "./components/loginform/loginform";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header"

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/login" element={<Loginform activeForm={true}/>} ></Route>
      <Route path="/signup" element={<Loginform activeForm={false}/>} ></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
