import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./header.css";
import { IoIosRestaurant } from 'react-icons/io';
import { UseDarkMode } from '../darkmode/darkmode';
import { CgDarkMode } from 'react-icons/cg';

export default function Header() {
  const location = useLocation();
  const activePath = location.pathname;
  const {darkMode, toggleDarkMode} = useContext(UseDarkMode)

  return (
    <nav id='navbar' className={`grid ${darkMode ? "bg-dark" : "bg-light"}`}>
    <a href="/" className='logo'>
    <IoIosRestaurant className='logo-img'/>
      <h2 className='h3'>Restaurant</h2>
    </a>
      <ul className='nav-links'>
        <li className='nav-item'>
          <Link to="/" className={`nav-link ${activePath === "/" ? "active" : ""}`}>Home</Link>
        </li>
        <li className={activePath === "/booking" ? "nav-item active" : "nav-item"}>
          <Link to="/booking" className='nav-link'>Booking</Link>
        </li>
        <li className={activePath === "/food-order" ? "nav-item active" : "nav-item"}>
          <Link to="/food-order" className='nav-link'>Food</Link>
        </li>
        <li className="nav-item">
          <Link to={activePath === "/login" ? "/signup" : "/login"} className='nav-link'>
            {activePath === "/login" ? "SignUp" : "Login"}
          </Link>
        </li>
        <li className="nav-icon">
          <CgDarkMode className='icon' onClick={toggleDarkMode}/>
        </li>
      </ul>
    </nav>
  );
}
