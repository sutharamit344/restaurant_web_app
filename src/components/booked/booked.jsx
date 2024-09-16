import React from 'react'
import "./booked.css"
import { IoCalendarOutline, IoCardOutline, IoPeopleOutline, IoSparklesOutline, IoTimeOutline } from 'react-icons/io5'
import { BiRupee } from 'react-icons/bi'

export default function Booked() {
  return (
    <>
    <section id='booked' className='grid'>
        <div className='container'>
            <h1 className='h2'>Your Bookings</h1>
                    <div className='booking-card bg-item'>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <IoCalendarOutline/> date</div>
                                <div className='b-item'>
                                    <IoTimeOutline/> time</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <IoPeopleOutline/> guest</div>
                                <div className='b-item'>
                                    <IoSparklesOutline/> Occation</div>
                                </div>
                            </div>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>name</div>
                                <div className='b-item'>mobile</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>email</div>
                                <div className='b-item'>request</div>
                                </div>
                            </div>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <IoCardOutline/> card type</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>
                                    <BiRupee/> amount</div>
                                </div>
                            </div>
                            <div>
                                <div className='item-g'>
                                <div className='b-item'>date</div>
                                </div>
                                <div className='item-g'>
                                <div className='b-item'>time</div></div>
                            </div>
                    </div>
        </div>
    </section>
    </>
  )
}
