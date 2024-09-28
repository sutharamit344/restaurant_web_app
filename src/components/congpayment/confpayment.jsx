import React, { useContext, useEffect, useState } from 'react'
import "./confpayment.css"
import { useNavigate, useParams } from 'react-router-dom';
import { isInt } from 'validator';
import { AuthUserContext } from '../contextapis/authuserapi';
const location = window.location;

function Success(props) {
  const navigate = useNavigate()
  return (
    <div>
      <div className='doneImg'>
      <img src={`${location.origin}/assets/img/confPayment.gif`} alt="done" />
      </div>
      <h2>Amount Of ₹{props.amount}/- Paid</h2>
      <h2>Successful!</h2>
      <h2>{props.type} Id: {props.bookingId}</h2>
      <button className='btn-yellow' onClick={() => navigate(`/${props.redirect}`)}>Continue</button>
    </div>
  )
}

function Failed(props) {
  const navigate = useNavigate()
  return (
    <div>
      <div className='failImg'>
      <img src={`${location.origin}/assets/img/failed.gif`} alt="failed" />
      </div>
      <h2>OTP expired.</h2>
      <h2>{props.type} Id: {props.bookingId}</h2>
      <div>
        <div><button className='btn-yellow' onClick={props.retry} >Retry</button>
        <button className='btn-red' onClick={() => navigate(`/${props.redirect}`)}>Cancel</button></div>
      </div>
    </div>
  )
}


export default function ConfPayment() {
  const navigate = useNavigate()
  const {login, setLogin} = useContext(AuthUserContext)
  const {id, dataname, type, redirect} = useParams()


  useEffect(() => {
    const input = document.getElementsByName("userOtp")[0];
    if (input) input.focus();

      if (id && isInt(id)) {
        const storedData = localStorage.getItem(dataname);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (Array.isArray(parsedData)) {
              const find = parsedData.some((order) => {
                return order.objId === Number(id) && !order.paymentStatus;
              });
              if(!find){
                navigate(-1)
              }
            }
        } else {
          navigate(-1)
        }
      }else{
        navigate(-1)
      }
  }, [dataname, id]);


  

  const randomOtp = Math.floor(Math.random()*(9999-999)+999);
  const [otp, setOtp] = useState({
      digit: randomOtp,
      userInput: "",
      status: "initial",
      success: false
    })
    const retry = () => {
      setOtp({...otp, digit: Math.floor(Math.random()*(9999-999)+999), status: "initial", userInput: ""})
      setTimeout(() => {
        if(otp.success === false){
        setOtp((prev) => {
          return {...prev, status: "Time out"}
        })}
      }, 10000)
    }

  useEffect(() => {
  if(otp.status === "initial") {
    setOtp((prev) => {return {...prev, status: ""}})
    retry()
  }
  },[otp.status])



  const success = () => {
    if(otp.status){
      const fetch = JSON.parse(localStorage.getItem(dataname)).map((order) => {
        return order.objId === Number(id) ? {...order, paymentStatus: true, payTime: new Date()} : order
      })
      localStorage.setItem(dataname, JSON.stringify(fetch))
    }
  }
  
  const matchOtp = (e) => {
    e.preventDefault()
    if(otp.userInput){
      if(parseInt(otp.userInput) === otp.digit){
        success()
          setOtp((prev) => {
            return {...prev, status: "success", success: true}
          })
          setLogin({...login, refresh: true})
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
        !otp.success && otp.status === "Time out" && <Failed type={type} redirect={redirect} retry={retry} bookingId={id} amount={"100"}/>
      }
      {
        otp.success && <Success type={type} bookingId={id} amount={"100"} redirect={redirect}/>
      }
      {
        (otp.status === "" || otp.status === "incorrect" || otp.status === "initial") && 
        <form onSubmit={matchOtp}>
        <h2 className='h2'>Enter OTP {otp.digit}</h2>
        <h3 className='h3'>Confirm Payment</h3>
        <h2>{type} Id: {id}</h2>
        <input type="number" name='userOtp' id='userOtp' value={otp.userInput} onChange={handleOtp} style={{textAlign: "center", margin: "1rem 0 8px 0", width: "250px"}} autoComplete='false'/>
        {!otp.status && !otp.userInput && <div className='error-msg'>OTP is required.</div>}
        {otp.status === "incorrect" && otp.userInput && <div className='error-msg'>Enter valid OTP..</div>}
        <div><button type='submit' className='btn-yellow'>Confirm</button>
        <button className='btn-red' onClick={() => navigate("/"+redirect)}>Go back</button></div>
      </form>
      }
    </div>
  )
}
