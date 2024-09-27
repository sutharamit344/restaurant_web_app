import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./header.css";
import { IoIosRestaurant } from 'react-icons/io';
import { UseDarkMode } from '../darkmode/darkmode';
import { CgDarkMode } from 'react-icons/cg';
import FoodCart from '../foodcart/foodcart';
import { MdMenu } from 'react-icons/md';
import { AlertApiContext } from '../contextapis/alertapi';
import Alert from '../alert/alert';
import { AuthUserContext } from '../contextapis/authuserapi';
import { CartContext } from '../contextapis/cartapi';

export default function Header() {
  const {alert, closeAlert} = useContext(AlertApiContext)
  const {login, handleLogout} = useContext(AuthUserContext)
  const location = useLocation();
  const activePath = location.pathname;
  const {darkMode, toggleDarkMode} = useContext(UseDarkMode)
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const {items} = useContext(CartContext)
  
  const handleTOggleMenu = () => {
    setToggleMenu(!toggleMenu)
}
const handleToggleCart = () => {
  setToggleCart(!toggleCart)
}
useEffect(() => {
  setToggleMenu(false)
},[activePath, handleLogout])


const IsLogout = () => {
  return (
    <li className="nav-item">
    <Link to={activePath === "/login" ? "/signup" : "/login"} className='nav-link'>
      {activePath === "/login" ? "SignUp" : "Login"}
    </Link>
  </li>
  )
}


const IsLogin = () => {
  return (
    <li className="nav-item">
    <span className='nav-link nav-user-name'>
    <h3>Hi' </h3> <span>{login.username}</span>
    <div className='nav-hover-box bg-item'>
    <div className='nav-hover-item'>Profile</div>
    <div className='nav-hover-item'>
    <Link to="/booked">Bookings</Link></div>
    <div className='nav-hover-item'>
    <Link to="/orders">Orders</Link></div>
      <div className='nav-hover-logout' onClick={handleLogout}>LogOut</div>
    </div>
    </span>
    </li>
  )
}

  return (

    <>
    <nav id='navbar' className={`grid ${darkMode ? "bg-dark" : "bg-light"}`}>
      
    <a href="/" className='logo'>
    <IoIosRestaurant className='logo-img'/>
      <h2 className='h3'>Restaurant</h2>
    </a>
      <ul className={`nav-links ${toggleMenu ? "showMenu" : "hideMenu"}`}>
        <li className='nav-item'>
          <Link to="/" className={`nav-link ${activePath === "/" ? "active" : ""}`}>Home</Link>
        </li>
          {activePath === "/orders" || activePath === "/food-order"? (
            ""
          ):(  
            <li className='nav-item'>
              <Link to="/booking" className={`nav-link ${activePath.split("-")[0] === "/booking" ? "active" : ""}`}>Table</Link>
            </li>
          )}
        <li className='nav-item'>
          {activePath.split("-")[0] === "/booking" || activePath === "/booked"? (
            <Link to="/booked" className={`nav-link ${activePath === "/booked" ? "active" : ""}`}>Bookings</Link>
          ):(
            <Link to="/food-order" className={`nav-link ${activePath === "/food-order" ? "active" : ""}`}>Menu</Link>
          )}
        </li>
        {activePath === "/orders" || activePath === "/food-order"? (
            <li className='nav-item'>
              <Link to="/orders" className={`nav-link ${activePath.split("-")[0] === "/orders" ? "active" : ""}`}>Orders</Link>
            </li>
          ):(  
            ""
          )}
        {login.status ? <IsLogin/> : <IsLogout/>}
      </ul>
      <div id='nav-icons'>
      <div id='toggleDarkMode' className="nav-icon">
          <CgDarkMode className='icon' onClick={toggleDarkMode}/>
        </div>
        <div className='nav-icon' onClick={handleToggleCart}>
        <img src="/assets/img/food-cart.svg" className={`icon svg`} alt="food cart" />
        <span className='counter'>{items.length}</span>
        </div>
        <div className='nav-icon' id='toggleMenu'>
          <MdMenu className='icon' onClick={handleTOggleMenu}/>
        </div>
      </div>
    <FoodCart cart={{toggleCart, handleToggleCart}}/>
    <div className='alert-container'>
    <Alert login={login} alert={alert} closeAlert={closeAlert}/>
    </div>
    <section id="black-wall" onClick={handleTOggleMenu} className={toggleMenu ? "black-wall-show" : "black-wall-hide"}></section>
    </nav>
    </>
  );
}
