import React, { useEffect, useState } from 'react'
import "./confpayment.css"
import { useNavigate } from 'react-router-dom';
const domain = window.location.origin;

function Success(props) {
  const navigate = useNavigate()
  return (
    <div>
      <div className='doneImg'>
      <img src={`${domain}/assets/img/confPayment.gif`} alt="done" />
      </div>
      <h2>Amount Of ₹{props.amount}/- Paid</h2>
      <h2>Successful!</h2>
      <button className='btn-yellow' onClick={() => navigate("/booked")}>Go to Bookings</button>
    </div>
  )
}

function Failed({Retry}) {
  const navigate = useNavigate()
  return (
    <div>
      <div className='failImg'>
      <img src={`${domain}/assets/img/failed.gif`} alt="failed" />
      </div>
      <h2>OTP expired.</h2>
      <div>
        <div><button className='btn-yellow' onClick={Retry} >Retry</button>
        <button className='btn-red' onClick={() => navigate(-1)}>Cancel</button></div>
      </div>
    </div>
  )
}

export default function ConfPayment({amount, handlePayment}) {
  const navigate = useNavigate()

  const randomOtp = Math.floor(Math.random()*(9999-999)+999);
  const [otp, setOtp] = useState({
    digit: randomOtp,
    userInput: "",
    status: "initial",
    success: false
  })

    
    const Retry = () => {
      setOtp({...otp, digit: Math.floor(Math.random()*(9999-999)+999), status: "initial", userInput: ""})
      setTimeout(() => {
        if(otp.success === false){
        setOtp((prev) => {
          return {...prev, status: "Time out"}
        })}
      }, 10000)
    }

  useEffect(() => {
  otp.status === "initial" && Retry() 
  },[otp.status])

  useEffect(() => {
    const input = document.getElementsByName("userOtp")[0]
    input && input.focus()
    if(!amount){
      navigate("/booking")
    }
  },[])

  
  const matchOtp = (e) => {
    e.preventDefault()
    confOtp()
  }

  const confOtp = () => {
    if(otp.userInput){
      if(parseInt(otp.userInput) === otp.digit){
        handlePayment(true)
          setOtp((prev) => {
            return {...prev, status: "success", success: true}
          })
      }else{
        setOtp((prev) => {
          return {...prev, status: "incorrect"}
        })
      }
      }else{
        setOtp((prev) => {
          return {...prev, status: ""}
        })
      }
  }

  const handleOtp = (e) => {
    setOtp((prev) => {
      return {...prev, userInput: e.target.value}
    })
    if(otp.status === "incorrect"){
      setOtp((prev) => {
        return {...prev, status: ""}
      })
    }
  }

  return (
    <div id='confPayment' className='bg-light'>
      {
        !otp.success && otp.status === "Time out" && <Failed Retry={Retry}/>
      }
      {
        otp.success && <Success amount={amount}/>
      }
      {
        (otp.status === "" || otp.status === "incorrect" || otp.status === "initial") && 
        <form onSubmit={matchOtp}>
        <h2 className='h2'>Enter OTP {otp.digit}</h2>
        <h3 className='h3'>Confirm Payment</h3>
        <input type="number" name='userOtp' value={otp.userInput} onChange={handleOtp} style={{textAlign: "center", margin: "1rem 0 8px 0", width: "250px"}}/>
        {!otp.status && !otp.userInput && <div className='error-msg'>OTP is required.</div>}
        {otp.status === "incorrect" && otp.userInput && <div className='error-msg'>Enter valid OTP..</div>}
        <div><button type='submit' className='btn-yellow'>Confirm</button>
        <button className='btn-red' onClick={() => navigate(-1)}>Go back</button></div>
      </form>
      }
    </div>
  )
}
