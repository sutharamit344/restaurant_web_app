import React, { useContext } from 'react'
import "./booked.css"
import { IoCalendarOutline, IoCallOutline, IoCardOutline, IoMailOutline, IoPeopleOutline, IoPersonOutline, IoSearch, IoSparklesOutline, IoTimeOutline } from 'react-icons/io5'
import { BiRupee } from 'react-icons/bi'
import { BookingContext } from '../contextapis/bookingapi'
import { MdMessage, MdPaid } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function Booked() {
    const navigate = useNavigate()
    const {myBooking, setBid, bid} = useContext(BookingContext)

    const goToPayment = (objId) => {
        navigate(`/conf-payment/${objId}/bookings/Booking/booked`)
    }

  return (
    <>
    <section id='booked' className='grid'>
        <div className='container'>
            <div className='h-group'>
            <h1 className='h3'>Your Bookings</h1>
            <span>
                <div className='input-group'>
                <input type="number" name='searchBooking' value={bid} onChange={(e) => setBid(e.target.value)} placeholder='Search Booking...'/>
                <span className='input-icon'><IoSearch/></span>
                </div>
            </span>
            </div>
            <div id='booking-Cards'>
            {
                myBooking.length && myBooking.map((booked, i) => {
                    return (
                        <div key={i} className='booking-card bg-item'>
                                <div className='item-g'>
                                <div className='b-item'><span><IoCalendarOutline/></span> {booked.date}</div>
                                <div className='b-item'><span><IoTimeOutline/></span>{booked.time}</div>
                                <div className='b-item'><span><IoPeopleOutline/></span>{booked.guest} Guest</div>
                                <div className='b-item'><span><IoSparklesOutline/></span>{booked.occation}</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'><span><IoPersonOutline/></span> {booked.name}</div>
                                <div className='b-item'><span><IoCallOutline/></span>{booked.mobile}</div>
                                <div className='b-item'><span><IoMailOutline/></span>{booked.email}</div>
                                <div className='b-item'><span><MdMessage/></span>{booked.request}</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'><span><IoCardOutline/></span> {booked.cardType}</div>
                                <div className='b-item'><span><BiRupee/></span>{booked.amount}/- </div>
                                <div className='b-item'><span>Booking Id :</span>{booked.objId}</div>
                                <div className='b-item'>{booked.paymentStatus ? <span><MdPaid/> Paid</span> : <button className='pay-btn'  onClick={() => goToPayment(booked.objId)}>Pay</button>}</div>
                                </div>
                    </div>
                    )
                }).reverse()
            }
                    </div>
                    
        </div>
    </section>
    </>
  )
}
