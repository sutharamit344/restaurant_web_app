import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./header.css";

const domain = window.location.origin + "/";

export default function Header() {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <nav id='navbar' className='grid'>
      <a href="/" className='logo'>
        <img src={domain + "assets/img/logo.png"} alt='logo' />
        <h1>Restaurant</h1>
      </a>
      <ul className='nav-links'>
        <li className={activePath === "/" ? "nav-item active" : "nav-item"}>
          <Link to="/" className='nav-link'>Home</Link>
        </li>
        <li className={activePath === "/tableBooking" ? "nav-item active" : "nav-item"}>
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
      </ul>
    </nav>
  );
}
