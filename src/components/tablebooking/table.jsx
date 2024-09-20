import React, { useContext, useEffect, useState } from "react";
import { IoCalendar, IoCall, IoCard, IoCardOutline, IoMail, IoPeople, IoPerson, IoSparkles, IoTime, IoTimer } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ConfPayment from "../congpayment/confpayment";
import Payment from "../paymentmethods/payment";
import { BookingContext } from "../contextapis/bookingapi";
import { MdMessage } from "react-icons/md";
import { AuthUserContext } from "../contextapis/authuserapi";

const location = window.location;

export default function Table() {
    const path = useLocation()
    const step = path.pathname;
    const navigate = useNavigate()
    const {login} = useContext(AuthUserContext)
    const {bookingObj, bookings, setBookings, timeSlots, guest, complexField} = useContext(BookingContext)

    const [Booking, setBooking] = useState(bookingObj)

    const [field, setField] = useState(complexField)
    
    const valid = {
        isDate: Booking.date,
        isTime: Booking.time,
        isGuest: Booking.guest,
        isOccation: Booking.occation,
        isFname: field.fname,
        isLname: field.lname,
        isMobile: Booking.mobile,
        isEmail: Booking.email,
        isRquest: Booking.message,
        isBooking: Booking.date && Booking.time && Booking.guest && Booking.occation ? true : false,
        isContact: field.fname && Booking.mobile? true : false,
        isCardDetail: field.cardType && field.cardHolder && field.exMonth && field.exYear && field.cvv && field.cardNum1 && field.cardNum2 && field.cardNum3 && field.cardNum4? true : false
    }

    const confAll = !valid.isBooking && !valid.isContact && !valid.isCardDetail;
    const confData = valid.isBooking && valid.isContact && valid.isCardDetail;

    const nextStep = () => {
        switch(step){
            case "/booking" : {
                navigate("/booking-contact")
                break
            }
            case "/booking-contact" : {
                navigate("/booking-payment")
                break
            }
            case "/booking-payment" : {
                navigate("/booking-overview")
                break
            }
            case "/booking-overview" : {
                navigate("/conf-payment")
                break
            }
            default : {
                break
            }
        }
        
        setField((prev) => {
            return {...prev, bookingSubmited: false}
        })
      };

    const prevStep = (e) => {
        e.preventDefault()
        switch(step){
            case "/booking-contact" : {
                navigate("/booking")
                break
            }
            case "/booking-payment" : {
                navigate("/booking-contact")
                break
            }
            case "/booking-overview" : {
                navigate("/booking-payment")
                break
            }
            default : {
                break
            }
        }
    }

    const handleBooking = (e) => {
        e.preventDefault()
        setField((prev) => {
            return {...prev, bookingSubmited: true}
        })
        if(valid.isBooking){
            if(location.pathname === "/booking"){
                nextStep()
            }
            if(valid.isContact){
                if(location.pathname === "/booking-contact"){
                    nextStep()
                }
                if(valid.isCardDetail){
                    if(location.pathname === "/booking-payment"){
                        nextStep()
                    }
                    if(confData && location.pathname === "/booking-overview"){
                        setBooking((prev) => {
                            return {...prev, 
                                name: field.fname+" "+field.lname,
                                cardType: field.cardType,
                                cardHolder: field.cardHolder,
                                exDate: field.exMonth+" "+field.exYear,
                                cvv: field.cvv,
                                cardNum: field.cardNum1+" "+field.cardNum2+" "+field.cardNum3+" "+field.cardNum4,
                                amount: Booking.guest*100,
                                bookingId: bookings.length+1,
                                userId: ""
                            }
                        })                        
                        nextStep()
                    }else{
                        navigate("/booking")
                    }
                }else(
                    navigate("/booking-payment")
                )
            }else{
                navigate("/booking-contact")
            }
        }else{
            navigate("/booking")
        }
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setBooking({...Booking, [name]: value})
      }
      const handleComplexInput = (e) => {
        let {name, value} = e.target;
        setField({...field, [name]: value})

      }

      useEffect(() => {
        if(confAll && location.pathname !== "/conf-payment"){
            navigate("/booking")
        }
      },[field, navigate, confAll])
      
      const handlePayment = (status) => {
        if(status){
            setBookings([...bookings, {...Booking, paymentStatus: true, userId: login.id}])
            setBooking({...Booking, ...bookingObj})
            setField({...field, ...complexField})
        }
      }

    return (
        <>
        <section id="table-section" className="grid">
            <div id="form-body">
                <div className={`form-box ${step === "/booking" ? "" : "hidden"}`}>
                <form className="form-col-2">
                    <h2 className="h2 col-2">Table Booking</h2>
                    <div className="form-control">
                        <label htmlFor="bookingDate">Date</label>
                        <input type="date" name="date" id="bookingDate"
                        value={Booking.date} onChange={handleInputChange}/>
                        {field.bookingSubmited && !valid.isDate && <div className="error-msg">Date is required.</div>}
                    </div>
                    <div className="form-control">
                    <label htmlFor="timeSlots">Time Slots</label>
                        <div className="input-group">
                        <select name="time" id="timeSlots"
                        value={Booking.time} onChange={handleInputChange}>
                            <option value="">Select time</option>
                            {
                                timeSlots.map((time, i) => {
                                    return (
                                        <option key={i} value={time}>{time}</option>
                                    )
                                })
                            }
                        </select>
                        <span className="input-icon"><IoTimer/></span>
                        </div>
                        {field.bookingSubmited && !valid.isTime && <div className="error-msg">Time is required.</div>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="nOuest">Number Of Guest</label>
                        <div className="input-group">
                        <select name="guest" id="nOuest"
                        value={Booking.guest} onChange={handleInputChange}>
                            <option value="">Select guest</option>
                            {
                                guest.map((guest, i) => {
                                    return (
                                        <option key={i} value={guest.value}>{guest.label}</option>
                                    )
                                })
                            }
                        </select>
                        <span className="input-icon"><IoPeople/></span>
                        </div>
                        {field.bookingSubmited && !valid.isGuest && <div className="error-msg">Guest is required.</div>}
                    </div>
                    <div className="form-control">
                    <label htmlFor="occation">Occation</label>
                        <div className="input-group">
                        <input type="text" name="occation" id="occation" list="occationList" placeholder="Occation"
                        value={Booking.occation} onChange={handleInputChange}/>
                        <datalist id="occationList">
                            <option value="Birthday"></option>
                            <option value="Annivarsary"></option>
                        </datalist>
                        <span className="input-icon"><IoSparkles/></span>
                        </div>
                        {field.bookingSubmited && !valid.isOccation && <div className="error-msg">Date is required.</div>}
                    </div>
                    <input type="submit" onClick={handleBooking} value="Continue" className="btn-yellow form-btn"/>
                </form>
                </div>
                <div className={`form-box ${step === "/booking-payment" ? "" : "hidden"}`}>
                <Payment nextPath={nextStep} prevPath={prevStep} formData={field} handleCard={handleBooking} handleInputChange={handleComplexInput}/>
                </div>

                <div className='image' style={{backgroundImage: `url("${location.origin}/assets/img/rimg2.png")`}}></div>

                <div className={`form-box ${step === "/booking-contact" ? "" : "hidden"}`}>
                <form className="form-col-2">
                    <h2 className="h2 col-2">Contact Detail</h2>
                    <div className="form-control">
                        <label htmlFor="firstName">First Name <sup>*</sup></label>
                        <input type="text" name="fname" id="firstName" placeholder="First Name"
                        value={field.fname} onChange={handleComplexInput} />
                        {field.bookingSubmited && !valid.isFname && <div className="error-msg">First name is required.</div>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lname" id="lastName" placeholder="Last Name"
                        value={field.lname} onChange={handleComplexInput} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="mobile">Mobile No. <sup>*</sup></label>
                        <input type="number" name="mobile" id="mobile" placeholder="+91"
                        value={Booking.mobile} onChange={handleInputChange} />
                        {field.bookingSubmited && !valid.isMobile && <div className="error-msg">Mobile number is required.</div>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="billEmail">Email</label>
                        <input type="email" name="email" id="billEmail" placeholder="Your email"
                        value={Booking.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-control col-2">
                        <label htmlFor="message">Special message</label>
                        <textarea name="message" id="message" rows="2" placeholder="Special message"
                        value={Booking.message} onChange={handleInputChange} ></textarea>
                    </div>
                    <input type="submit" onClick={handleBooking} value="Continue" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Back" className="btn-yellow form-btn"/>
                </form>
                </div>
                <div className={`form-box ${step === "/booking-overview" ? "" : "hidden"}`}>
                <div className="form-col-2 overview">
                    <h2 className="h2">Overview</h2>
                    <div className="overview-row col-2">
                        <h3>Booking</h3>
                        <ul className="overview-ul">
                            <li><IoCalendar/> {Booking.date}</li>
                            <li><IoTime/>{Booking.time}</li>
                            <li><IoPeople/>{Booking.guest} </li>
                            <li><IoSparkles/>{Booking.occation}</li>
                        </ul>
                    </div>
                    <div className="overview-row col-2">
                        <h3>Contact detail</h3>
                        <ul className="overview-ul">
                        <li><IoPerson/>{field.fname} {field.lname}</li>
                        <li><IoCall/>{Booking.mobile}</li>
                        <li><IoMail/>{Booking.email}</li>
                        <li><MdMessage/>{Booking.message}</li>
                        </ul>
                    </div>
                    <div className="overview-row col-2">
                        <h3>Payment Method</h3>
                        <ul className="overview-ul">
                        <li><IoCard/>{Booking.cardType}</li>
                        <li><IoPerson/>{Booking.cardHolder}</li>
                        <li><IoCalendar/>{field.exMonth}/{field.exYear}</li>
                        <li>CVV: {Booking.cvv}</li>
                        <li><IoCardOutline/>{Booking.cardNum}</li>
                        </ul>
                    </div>
                    <div className="overview-row col-2">
                        <h3>Payble Amount</h3>
                        <ul className="overview-ul">
                            <li>₹ 100/- Per Person.</li>
                            <li>Your Total Payble Amount : <b>₹{Booking.amount}/-</b></li>
                        </ul>
                    </div>
                    <input type="submit" onClick={handleBooking} value="Confirm" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Cancel" className="btn-yellow form-btn"/>
                </div>
                </div>
            </div>
        </section>
        {step === "/conf-payment" ? <ConfPayment amount={Booking.amount} handlePayment={handlePayment}/> : ""}
        </>
    )
}