import React, { useState } from 'react';
import "./loginform.css";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation } from "react-router-dom";

const domain = window.location.origin;

export default function Loginform() {
  const location = useLocation();
  const activePath = location.pathname;
  const [loginPassVisibility, setLoginPassVisibility] = useState(false);
  const [signupPassVisibility, setSignupPassVisibility] = useState(false);
  const [signup, setSignup] = useState()

  const handleLoginPassToggle = () => {
    setLoginPassVisibility(!loginPassVisibility);
  };

  const handleSignupPassToggle = () => {
    setSignupPassVisibility(!signupPassVisibility);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
  };

  return (
    <section id='login-section' className='grid'>
      <div id='form-body' className={`bg-dark`}>
        <div className={`form-box login ${activePath === "/login" ? "" : "hidden"}`}>
          <form onSubmit={handleSubmit} className='form-col-1'>
            <h2 className='h2'>LogIn</h2>
            <div className='form-control'>
              <label htmlFor="login-email">Email</label>
              <input type="email" name='userEmail' placeholder='Email' id='login-email'/>
            </div>
            <div className='form-control'>
              <label htmlFor="login-password">Password</label>
              <div className='input-group'>
                <input 
                  type={loginPassVisibility ? "text" : "password"} 
                  placeholder='Password' 
                  name='userPassword' 
                  id='login-password'
                />
                <span className='input-icon' onClick={handleLoginPassToggle}>
                  {loginPassVisibility ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <a href="/">?Forgot password</a>
            </div>
            <input type="submit" value="LogIn" className="btn-yellow form-btn"/>
            <div className='form-control'>
              <Link to="/signup">SignUp</Link>
            </div>
          </form>
        </div>
        
      <div className='image' style={{backgroundImage: `url("${domain}/assets/img/rimg1.png")`}}></div>

        <div className={`form-box signup ${activePath === "/signup" ? "" : "hidden"}`}>
          <form onSubmit={handleSubmit} className='form-col-1'>
            <h2 className='h2'>SignUp</h2>
            <div className='form-control'>
              <label htmlFor="signup-email">Email</label>
              <input type="email" name='userEmail' placeholder='Email' id='signup-email'/>
            </div>
            <div className='form-control'>
              <label htmlFor="signup-password">Password</label>
              <div className='input-group'>
                <input 
                  type={signupPassVisibility ? "text" : "password"} 
                  placeholder='Password' 
                  name='userPassword' 
                  id='signup-password'
                />
                <span className='input-icon' onClick={handleSignupPassToggle}>
                  {signupPassVisibility ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <div className='form-control'>
              <label htmlFor="signup-c-password">Confirm password</label>
              <div className='input-group'>
                <input 
                  type={signupPassVisibility ? "text" : "password"} 
                  placeholder='Confirm password' 
                  name='userPassword' 
                  id='signup-c-password'
                />
                <span className='input-icon' onClick={handleSignupPassToggle}>
                  {signupPassVisibility ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <input type="submit" value="SignUp" className="btn-yellow form-btn"/>
            <div className='form-control'>
              <Link to="/login">LogIn</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
