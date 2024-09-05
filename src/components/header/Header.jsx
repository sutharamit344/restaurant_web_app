import React from 'react'
import "./header.css"

export default function Header() {
  
const url = window.location+"assets/img/logo.png";

  return (
    <nav id='navbar' className='grid'>
      <a href="/" className='logo'>
        <img src={url} alt='logo' />
        <h1>Restaurant</h1>
      </a>
      <ul className='nav-links'>
          <li className='nav-item active'>Home</li>
          <li className='nav-item'>About</li>
          <li className='nav-item'>Table</li>
          <li className='nav-item'>Foods</li>
          <li className='btn'>Login</li>
      </ul>
    </nav>
  )
}
