import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AuthUserContext } from './authuserapi'

export const BookingContext = createContext()

export default function BookingProvider({children}) {
const {login, setLogin} = useContext(AuthUserContext)
const guest = [{ "value": "1", "label": "1 Guest" },{ "value": "2", "label": "2 Guest" },{ "value": "3", "label": "3 Guest" },{ "value": "4", "label": "4 Guest" },{ "value": "10", "label": "10 Guest Room" },{ "value": "50", "label": "50 Guest Hall" },{ "value": "100", "label": "100 Guest Hall" }]
const timeSlots = ["08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM"]
const bookingObj = {userId: "",date: new Date().toISOString().split("T")[0],time: "",guest: "",occation: "",name: "", mobile: "",email: "", message: "", cardType: "Credit Card" ,cardHolder: "" ,exDate: "", cvv: "" ,cardNum: ""}
const complexField = {  cardType: "Credit Card",  cardHolder: "",  fname: "",  lname: "",  exMonth: "",  exYear: "",  cvv: "",  cardNum1: "",  cardNum2: "",  cardNum3: "",  cardNum4: "",  paymentStatus: false,  submited: false}
const bookings =useRef(null)
const mybookings = useRef(null)
const [bid, setBid] = useState("")

  const getBookings = () => {
    bookings.current = localStorage.getItem("bookings")
    bookings.current = bookings.current ? JSON.parse(bookings.current) : []
    return bookings.current
  }

  const myBookings = () => {
    const bookingsArr = getBookings()
    mybookings.current = bookingsArr.filter((booking) => {
      return !bid ? booking.userId === login.id : booking.objId === Number(bid)
    })
  return mybookings.current
  }

  const [myBooking, setMyBookings] = useState(myBookings)

  useEffect(() => {
    setMyBookings(myBookings())
  },[login, bid])

  const cancelbooking = (objId) => {
    const bookingsArr = getBookings()
    localStorage.setItem("bookings", JSON.stringify(
    bookingsArr.map((booking) => {
      return booking.objId === objId ? {...booking, bookingStatus: false} : booking
    })
  ))
  setLogin({...login, refresh: true})
  }

  return (
    <BookingContext.Provider value={{cancelbooking, bookingObj, bookings, timeSlots, guest, complexField, myBooking, setBid, bid}}>
        {children}
    </BookingContext.Provider>
  )
}
