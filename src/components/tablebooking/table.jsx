import React from "react";
import { IoPeopleOutline, IoSparklesOutline, IoTimerOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ConfPayment from "../congpayment/confpayment";
import Payment from "../paymentmethods/payment";

const location = window.location.origin;

export default function Table() {
    const path = useLocation()
    const step = path.pathname;
    const navigate = useNavigate()

    const nextStep = (e) => {
        e.preventDefault();
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

    return (
        <>
        <section id="table-section" className="grid">
            <div id="form-body">
                <div className={`form-box ${step === "/booking" ? "" : "hidden"}`}>
                <form className="form-col-2">
                    <h2 className="h2 col-2">Table Booking</h2>
                    <div className="form-control">
                        <label htmlFor="bookingDate">Date</label>
                        <input type="date" name="bookingDate" id="bookingDate"/>
                    </div>
                    <div className="form-control">
                    <label htmlFor="timeSlots">Time Slots</label>
                        <div className="input-group">
                        <select name="timeSlots" id="timeSlots">
                            <option value="">Select time</option>
                        </select>
                        <span className="input-icon"><IoTimerOutline/></span>
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="nOuest">Number Of Guest</label>
                        <div className="input-group">
                        <select name="nOuest" id="nOuest">
                            <option value="">Select guest</option>
                            <option value="">1 Guest</option>
                            <option value="">2 Guest</option>
                            <option value="">3 Guest</option>
                            <option value="">4 Guest</option>
                            <option value="">10 Guest Room</option>
                            <option value="">50 Guest Hall</option>
                            <option value="">100 Guest Hall</option>
                        </select>
                        <span className="input-icon"><IoPeopleOutline/></span>
                        </div>
                    </div>
                    <div className="form-control">
                    <label htmlFor="occation">Occation</label>
                        <div className="input-group">
                        <input type="text" name="occation" id="occation" list="occationList" placeholder="Occation"/>
                        <datalist id="occationList">
                            <option value="Birthday"></option>
                            <option value="Annivarsary"></option>
                        </datalist>
                        <span className="input-icon"><IoSparklesOutline/></span>
                        </div>
                    </div>
                    <input type="submit" onClick={nextStep} value="Continue" className="btn-yellow form-btn"/>
                </form>
                </div>
                <div className={`form-box ${step === "/booking-payment" ? "" : "hidden"}`}>
                <Payment nextPath={nextStep} prevPath={prevStep}/>
                </div>
                <div className='image' style={{backgroundImage: `url("${location}/assets/img/rimg2.png")`}}></div>
                <div className={`form-box ${step === "/booking-contact" ? "" : "hidden"}`}>
                <form className="form-col-2">
                    <h2 className="h2 col-2">Contact Detail</h2>
                    <div className="form-control">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name"/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name"/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="mobile">Mobile No.</label>
                        <input type="number" name="mobile" id="mobile" placeholder="+91"/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="billEmail">Email</label>
                        <input type="email" name="billEmail" id="billEmail" placeholder="Your email"/>
                    </div>
                    <div className="form-control col-2">
                        <label htmlFor="request">Special request</label>
                        <textarea name="request" id="request" rows="2" placeholder="Special request"></textarea>
                    </div>
                    <input type="submit" onClick={nextStep} value="Continue" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Back" className="btn-yellow form-btn"/>
                </form>
                </div>
                <div className={`form-box ${step === "/booking-overview" ? "" : "hidden"}`}>
                <div className="form-col-2">
                    <h2 className="h2">Overview</h2>
                    <div className="form-control col-2">
                        <h3>Booking</h3>
                        <ul className="overviwe-ul">
                            <li>04-04-0000</li>
                            <li>93:83 Pm</li>
                            <li>guest</li>
                            <li>occation</li>
                        </ul>
                    </div>
                    <div className="form-control col-2">
                        <h3>Contact detail</h3>
                        <ul className="overviwe-ul">
                            <li>Name</li>
                            <li>mobile</li>
                            <li>email</li>
                            <li>request</li>
                        </ul>
                    </div>
                    <div className="form-control col-2">
                        <h3>Payment</h3>
                        <ul className="overviwe-ul">
                            <li>card type</li>
                            <li>card name</li>
                            <li>cvv</li>
                            <li>rx. date</li>
                            <li>card number</li>
                        </ul>
                    </div>
                    <div className="form-control col-2">
                        <h3>Deposit Amount</h3>
                        <ul className="overviwe-ul">
                            <li>₹ 100/- Per Person</li>
                            <li>Your Total Payble Amount : ₹ 400/-</li>
                        </ul>
                    </div>
                    <input type="submit" onClick={nextStep} value="Confirm" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Cancel" className="btn-yellow form-btn"/>
                </div>
                </div>
            </div>
        </section>
        {step === "/conf-payment" ? <ConfPayment redirect="/" amount="400"/> : ""}
        </>
    )
}