import React, { useContext, useEffect } from 'react'
import "./booked.css"
import { IoCalendarOutline, IoCardOutline, IoPeopleOutline, IoSparklesOutline, IoTimeOutline } from 'react-icons/io5'
import { BiRupee } from 'react-icons/bi'
import { AuthUserContext } from '../contextapis/authuserapi'
import { BookingContext } from '../contextapis/bookingapi'

export default function Booked() {
    const {login} = useContext(AuthUserContext)
    const {myBooking} = useContext(BookingContext)



  return (
    <>
    <section id='booked' className='grid'>
        <div className='container'>
            <h1 className='h2'>Your Bookings</h1>
            {
                myBooking.length && myBooking.map((booked, i) => {
                    return (
                        <div key={i} className='booking-card bg-item'>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <IoCalendarOutline/> {booked.date}</div>
                                <div className='b-item'>
                                    <IoTimeOutline/> {booked.time}</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <IoPeopleOutline/> {booked.guest}</div>
                                <div className='b-item'>
                                    <IoSparklesOutline/> {booked.occation}</div>
                                </div>
                            </div>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>{booked.name}</div>
                                <div className='b-item'>{booked.mobile}</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>{booked.email}</div>
                                <div className='b-item'>{booked.request}</div>
                                </div>
                            </div>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <IoCardOutline/> {booked.cardType}</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <BiRupee/> {booked.amount} - {booked.paymentStatus ? "Paid" : "Pay"}</div>
                                </div>
                            </div>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'></div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'></div></div>
                            </div>
                    </div>
                    )
                })
            }
                    
        </div>
    </section>
    </>
  )
}
