import React, { useContext, useEffect, useState } from 'react';
import validator from 'validator';
import "./loginform.css";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthUserContext } from '../contextapis/authuserapi';
import { AlertApiContext } from '../contextapis/alertapi';

const domain = window.location.origin;

export default function Loginform() {
  const navigate = useNavigate()
  const {login , handleUserAuth} = useContext(AuthUserContext) 
  useEffect(() => {
    if(login.status){
      navigate(-1)
    }
  },[login,navigate])
  const {handleAlert} = useContext(AlertApiContext)
  const location = useLocation();
  const activePath = location.pathname;
  const [passVisibility, setPassVisibility] = useState({
    pass: false,
    cpass: false
  });
  const [formData, setFormData] = useState({
    username: "",
    usernameTouched: false,
    email: "",
    emailTouched: false,
    pass: "",
    passTouched: false,
    cpass: "",
    cpassTouched: false,
    submitTouched: false
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const handlePassVisibility = (e) => {
    const name = e.currentTarget.dataset.name;
    setPassVisibility({...passVisibility, [name]: !passVisibility[name]})
  };

  const {username, usernameTouched, email, emailTouched, pass, passTouched, cpass, cpassTouched} = formData;

  const valid = {
    isUsername: username && usernameTouched && (username.length < 2 || username.length > 6),
    isEmail: email && emailTouched && !validator.isEmail(email),
    isPass: pass && passTouched && !validator.isStrongPassword(pass,{
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),
    isCpass: cpass && cpassTouched && pass !== cpass
  }

  const auth = (formType) => {
    const authCheck = handleUserAuth({formType, username, email, pass})
    handleAlert(authCheck)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({...formData, submitTouched: true})
    if(location.pathname === "/signup"){
    if(!valid.isUsername && !valid.isPass && cpass && pass === cpass){
      auth("signup")
    }}
    if(location.pathname === "/login"){
    if(email && !valid.isPass){
      auth("login")
    }}
  };

  return (
    <>
    <section id='login-section' className='grid'>
      <div id='form-body' className={`bg-dark`}>
        <div className={`form-box login ${activePath === "/login" ? "" : "hidden"}`}>
          <form onSubmit={handleSubmit} className='form-col-1'>
            <h2 className='h2'>LogIn</h2>
            <div className='form-control'>
              <label htmlFor="login-email">Email</label>
              <input type="email" name='email'
                  style={{outlineColor: valid.isEmail ? "red" : ""}} 
                  value={email} onChange={handleInputChange} 
                  onBlur={() => setFormData(email ? {...formData, emailTouched: true} : {...formData, emailTouched: false})}
                  placeholder='Email' id='login-email'
                  autoComplete='email'/>
                  { formData.submitTouched && !email && <div className='error-msg'>Email is required.</div>}
                  { formData.submitTouched && valid.isEmail && <div className='error-msg'>Email is invalid.</div>}
            </div>
            <div className='form-control'>
              <label htmlFor="login-password">Password</label>
              <div className='input-group'
                  style={{outlineColor: valid.isPass ? "red" : ""}} >
                <input 
                  type={passVisibility.pass ? "text" : "password"} 
                  placeholder='Password' 
                  name='pass' 
                  value={pass} onChange={handleInputChange}
                  onBlur={() => setFormData(pass ? {...formData, passTouched: true} : {...formData, passTouched: false})}
                  id='login-password'
                />
                <span className='input-icon' data-name="pass" onClick={handlePassVisibility}>
                  {passVisibility.pass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
                  { formData.submitTouched && !pass && <div className='error-msg'>Password is required.</div>}
                  { formData.submitTouched && valid.isPass && <div className='error-msg'>Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.</div>}
              <a href="/">?Forgot password</a>
            </div>
            <input type="submit" value="LogIn" className="btn-yellow form-btn"/>
            <div className='form-link'>
              <Link to="/signup">SignUp</Link>
            </div>
          </form>
        </div>
        
      <div className='image' style={{backgroundImage: `url("${domain}/assets/img/rimg1.png")`}}></div>

        <div className={`form-box signup ${activePath === "/signup" ? "" : "hidden"}`}>
          <form onSubmit={handleSubmit} className='form-col-1' noValidate>
            <h2 className='h2'>SignUp</h2>
            <div className='form-control'>
              <label htmlFor="signup-username">Nick Name</label>
              <input type="text" name='username'
                  style={{outlineColor: valid.isUsername ? "red" : ""}} 
                  value={username} onChange={handleInputChange} 
                  onBlur={() => setFormData(username ? {...formData, usernameTouched: true} : {...formData, usernameTouched: false})}
                  placeholder='Nick Name' id='signup-username'
                  autoComplete='name'/>
                  { formData.submitTouched && !username && <div className='error-msg'>Nick name is required.</div>}
                  { formData.submitTouched && valid.isUsername && <div className='error-msg'>Nick name length must be min 2 max 6.</div>}
            </div>
            <div className='form-control'>
              <label htmlFor="signup-email">Email</label>
              <input type="email" name='email'
                  style={{outlineColor: valid.isEmail ? "red" : ""}} 
                  value={email} onChange={handleInputChange} 
                  onBlur={() => setFormData(email ? {...formData, emailTouched: true} : {...formData, emailTouched: false})}
                  placeholder='Email' id='signup-email'
                  autoComplete='email'/>
                  { formData.submitTouched && !email && <div className='error-msg'>Email is required.</div>}
                  { formData.submitTouched && valid.isEmail && <div className='error-msg'>Email is invalid.</div>}
            </div>
            <div className='form-control'>
              <label htmlFor="signup-password">Password</label>
              <div className='input-group'
                  style={{outlineColor: valid.isPass ? "red" : ""}} >
                <input 
                  type={passVisibility.pass ? "text" : "password"} 
                  placeholder='Password' 
                  name='pass' 
                  value={pass} onChange={handleInputChange}
                  onBlur={() => setFormData(pass ? {...formData, passTouched: true} : {...formData, passTouched: false})}
                  id='signup-password'
                />
                <span className='input-icon' data-name="pass" onClick={handlePassVisibility}>
                  {passVisibility.pass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
                  { formData.submitTouched && !pass && <div className='error-msg'>Password is required.</div>}
                  { formData.submitTouched && valid.isPass && <div className='error-msg'>Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.</div>}
            </div>
            <div className='form-control'>
              <label htmlFor="signup-c-password">Confirm password</label>
              <div className='input-group'
                  style={{outlineColor: valid.isCpass ? "red" : ""}}>
                <input 
                  type={passVisibility.cpass ? "text" : "password"} 
                  placeholder='Confirm password' 
                  name='cpass' 
                  value={formData.cpass} 
                  onChange={handleInputChange}
                  onBlur={() => setFormData(email && pass && cpass ? {...formData, cpassTouched: true} : {...formData, cpassTouched: false})}
                  id='signup-c-password'
                  autoComplete='password'
                />
                <span className='input-icon' data-name="cpass" onClick={handlePassVisibility}>
                  {passVisibility.cpass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
                  { formData.submitTouched && !cpass && <div className='error-msg'>Confirm password.</div>}
                  { formData.submitTouched && valid.isCpass && <div className='error-msg'>Password not match.</div>}
            </div>
            <input type="submit" value="SignUp" className="btn-yellow form-btn"/>
            <div className='form-link'>
              <Link to="/login">LogIn</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}
