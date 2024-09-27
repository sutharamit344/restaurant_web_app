import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { AuthUserContext } from './authuserapi'
import { MenuContext } from './menuapi'
export const CartContext = createContext()

export default function CartProvider({children}) {
    const {login, setLogin} = useContext(AuthUserContext)
    const {menu} = useContext(MenuContext)
    const complexField = {  cardType: "Credit Card",  cardHolder: "",  fname: "",  lname: "",  exMonth: "",  exYear: "",  cvv: "",  cardNum1: "",  cardNum2: "",  cardNum3: "",  cardNum4: "",  paymentStatus: false,  bookingSubmited: false}
    const ordersObj = {userId: "",name: "", mobile: "", email: "", address: "", message: "", cardType: "Credit Card" ,cardHolder: "" ,exDate: "", cvv: "" ,cardNum: ""}
    const loginId = login.id
    const cartItems = useRef(null)
    const myCart = useRef(null)
    const ordersdata = useRef(null)
    const myOrder = useRef(null)
    
    ordersdata.current = localStorage.getItem("orders")
    ordersdata.current = ordersdata.current ? JSON.parse(ordersdata.current) : []
    myOrder.current = ordersdata.current.filter((order) => {
        return order.userId === login.id
    })
    const [orders, setOrders] = useState(myOrder.current)

    cartItems.current = localStorage.getItem("cartItem")
    cartItems.current = cartItems.current ? JSON.parse(cartItems.current) : {}
    myCart.current = cartItems.current["cart"+loginId] ? cartItems.current["cart"+loginId] : []
    const [items, setItems] = useState(myCart.current)
    const [subTotal, setSubTotal] = useState(0)

    
    useEffect(() => {
        if(items.length >= 0 && menu.length > 0){
            let total = 0
            items.forEach(item => {
                const cateId = String(item.itemId).split("")[0]-1
                const itemId = String(item.itemId).split("")[2]-1
                const price = menu[cateId].items[itemId].price
                const offer = menu[cateId].items[itemId].offer.split("%")[0]
                const save = (price)*(offer/100)
                total += ((price-save)*(item.qty))
            });
            setSubTotal(total)
        }
    },[login, items, menu])

    
    const [bid, setBid] = useState("")


    const handleSetItems = (itemId) => {
        const find = items.some(item => item.itemId === itemId)
        find ? 
        setItems(
            items.map(item => 
                item.itemId === itemId ?
                {...item, qty: item.qty < 10 ? item.qty+1 : item.qty}
                : item
            ))

        : setItems([...items, {
            itemId: itemId,
            qty: 1
        }])
    }
    const handleRemoveItem = (itemId) => {
        const find = items.some(item => item.itemId === itemId && item.qty > 1)
        if(find){
        setItems(
            items.map(item => 
                item.itemId === itemId ?
                {...item, qty: item.qty-1}
                : item
            )
        )
        }else{ 
            setItems(
                items.map(item => 
                    item.itemId === itemId ?
                    {...item, qty: 0}
                    : item
                )
            )
        }
        setTimeout(() => {
        setItems((prev) => prev.filter(item => item.qty !== 0))
        }, 100);
    }

    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify({...cartItems.current, ["cart"+loginId]: items}))
    },[items, orders])

    useEffect(() => {
        cartItems.current = localStorage.getItem("cartItem")
        cartItems.current = cartItems.current ? JSON.parse(cartItems.current) : {}
        myCart.current = cartItems.current["cart"+loginId] ? cartItems.current["cart"+loginId] : []
        setItems(myCart.current)
        ordersdata.current = localStorage.getItem("orders")
        ordersdata.current = ordersdata.current ? JSON.parse(ordersdata.current) : []
        myOrder.current = ordersdata.current.filter((order) => {
            return !bid ? order.userId === login.id : order.objId === Number(bid)
        })
        setOrders(myOrder.current)
    },[login.id, login.refresh, bid])

    
    const handleSetOrder = (newOrder) => {
        localStorage.setItem("orders", JSON.stringify([...ordersdata.current, {...newOrder, cart: items}]))
        setItems([])
        setLogin({...login, refresh: true})
    }

  return (
    <CartContext.Provider value={{bid, setBid, ordersObj, ordersdata, orders, subTotal, handleSetOrder, items, handleSetItems, handleRemoveItem, complexField}}>
        {children}
    </CartContext.Provider>
  )
}
