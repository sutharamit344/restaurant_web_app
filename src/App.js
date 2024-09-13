import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import React from "react";
import Loginform from "./components/loginform/loginform";
import Header from "./components/header/Header"
import Table from "./components/tablebooking/table";
import Foods from "./components/foodorder/foods";
import { FoodProvider } from "./components/foodprovider/foodprovider";
import Checkout from "./components/checkout/checkout";

function App() {

  return (
    <>
    <FoodProvider>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/booking" element={<Table/>}></Route>
      <Route path="/booking-contact" element={<Table/>}></Route>
      <Route path="/booking-payment" element={<Table/>}></Route>
      <Route path="/booking-overview" element={<Table/>}></Route>
      <Route path="/login" element={<Loginform activeForm={true}/>} ></Route>
      <Route path="/signup" element={<Loginform activeForm={false}/>} ></Route>
      <Route path="/conf-payment" element={<Table/>}></Route>
      <Route path="/food-order" element={<Foods/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/delivery-address" element={<Checkout/>} />
      <Route path="/delivery-payment" element={<Checkout/>} />
    </Routes>
    </BrowserRouter>
    </FoodProvider>
    </>
  );
}

export default App;
