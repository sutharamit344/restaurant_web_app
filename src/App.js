import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import React, { useContext, useEffect, useState } from "react";
import Loginform from "./components/loginform/loginform";
import Header from "./components/header/Header"
import Table from "./components/tablebooking/table";
import Foods from "./components/foodorder/foods";
import Checkout from "./components/checkout/checkout";
import { UseDarkMode } from "./components/darkmode/darkmode";
import Booked from "./components/booked/booked";
import Loader from "./components/loader/loader";

function App() {

  const {darkMode} = useContext(UseDarkMode)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="darkMode" className={`${darkMode ? "bg-dark" : "bg-light"}`}>
    {
      loader && <Loader/>
    }
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/booking" element={<Table/>}></Route>
      <Route path="/booking-contact" element={<Table/>}></Route>
      <Route path="/booking-payment" element={<Table/>}></Route>
      <Route path="/booking-overview" element={<Table/>}></Route>
      <Route path="/booked" element={<Booked/>}></Route>
      <Route path="/login" element={<Loginform activeForm={true}/>} ></Route>
      <Route path="/signup" element={<Loginform activeForm={false}/>} ></Route>
      <Route path="/conf-payment" element={<Table/>}></Route>
      <Route path="/food-order" element={<Foods/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/delivery-address" element={<Checkout/>} />
      <Route path="/delivery-payment" element={<Checkout/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
