import React, { useEffect } from 'react'
import "./confpayment.css"
import { useNavigate } from 'react-router-dom';
const domain = window.location.origin;

function Success(props) {
  return (
    <div>
      <div className='doneImg'>
      <img src={`${domain}/assets/img/confPayment.gif`} alt="done" />
      </div>
      <h2>Payment Of ₹{props.amount}/- Paid</h2>
      <h2>Successful!</h2>
    </div>
  )
}

function Failed() {
  const navigate = useNavigate()
  return (
    <div>
      <div className='failImg'>
      <img src={`${domain}/assets/img/failed.gif`} alt="failed" />
      </div>
      <h2>Verification code</h2>
      <h2>Incorrect!</h2>
      <div>
      <input type="button" value="Retry" className='btn-yellow' onClick={() => window.location.reload()}/>
      <input type="button" value="Cencel" className='btn-red' onClick={() => navigate(-1)}/>
      </div>
    </div>
  )
}

export default function ConfPayment(props) {
  const navigate = useNavigate()

  const randomOtp = Math.floor(Math.random()*9999); 
  const userINput = parseInt(prompt("Varification COde, Your dummy code: "+randomOtp))

  useEffect(() => {
    userINput === randomOtp &&
    setTimeout(() => {
      navigate(props.redirect)
    }, 2000);
  })

  return (
    <div id='confPayment'>
      {userINput === randomOtp ? <Success amount={props.amount}/> : <Failed/>}
    </div>
  )
}
