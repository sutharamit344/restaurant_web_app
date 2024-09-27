import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AuthUserContext } from './authuserapi'

export const BookingContext = createContext()

export default function BookingProvider({children}) {
const {login} = useContext(AuthUserContext)
const guest = [{ "value": "1", "label": "1 Guest" },{ "value": "2", "label": "2 Guest" },{ "value": "3", "label": "3 Guest" },{ "value": "4", "label": "4 Guest" },{ "value": "10", "label": "10 Guest Room" },{ "value": "50", "label": "50 Guest Hall" },{ "value": "100", "label": "100 Guest Hall" }]
const timeSlots = ["08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM"]
const bookingObj = {userId: "",date: new Date().toISOString().split('T')[0],time: "",guest: "",occation: "",name: "", mobile: "",email: "",message: "", cardType: "Credit Card" ,cardHolder: "" ,exDate: "", cvv: "" ,cardNum: ""}
const complexField = {  cardType: "Credit Card",  cardHolder: "",  fname: "",  lname: "",  exMonth: "",  exYear: "",  cvv: "",  cardNum1: "",  cardNum2: "",  cardNum3: "",  cardNum4: "",  paymentStatus: false,  bookingscurrentubmited: false}
const bookings =useRef(null)
const mybookings = useRef(null)

bookings.current = localStorage.getItem("bookings")
bookings.current = bookings.current ? JSON.parse(bookings.current) : []
mybookings.current = bookings.current.filter((order) => {
  return order.userId === login.id
})
const [myBooking, setMyBookings] = useState(mybookings.current)
const [bid, setBid] = useState("")

useEffect(() => {
  bookings.current = localStorage.getItem("bookings")
  bookings.current = bookings.current ? JSON.parse(bookings.current) : []
  mybookings.current = bookings.current.filter((order) => {
    return !bid ? order.userId === login.id : order.objId === Number(bid)
  })
  setMyBookings(mybookings.current)
},[login, bid])

  return (
    <BookingContext.Provider value={{bookingObj, bookings, timeSlots, guest, complexField, myBooking, setBid, bid}}>
        {children}
    </BookingContext.Provider>
  )
}
