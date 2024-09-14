import React, { useContext, useState } from "react"
import "./foodcart.css"
import CartItem from "./cartitem"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { UseDarkMode } from "../darkmode/darkmode"

export default function FoodCart() {
    const [toggleCart, setToggleCart] = useState(false)
    const {darkMode} = useContext(UseDarkMode)
    const navigate = useNavigate()

    const handleToggleCart = () => {
        setToggleCart(!toggleCart)
    }

    const checkout = () => {
        navigate("/checkout")
    }

    return (
        <>
        <section id="black-wall" onClick={handleToggleCart} className={toggleCart ? "black-wall-show" : "black-wall-hide"}></section>
        <section id="cart" className={`${toggleCart ? "cart-show" : "cart-hide"} ${darkMode ? "bg-dark" : "bg-light"}`}>
            <div className="cart-knob" onClick={handleToggleCart}>
                <div className="knob-btn">
                   {toggleCart ?  <IoIosArrowForward/>: <IoIosArrowBack/>}
            <img src="http://localhost:3000/assets/img/food-cart.svg" className={`svg ${toggleCart ? "icon-flip" : ""}`} alt="food cart" />
                </div>
            </div>
            <div className="h-group">
            <h1>Cart items</h1>
            </div>
            <CartItem/>
                <div className={`cart-subtotal bg-item`}>
                    <div>
                        Sub total
                    </div>
                    <div className="cart-total">
                        <b>3848</b>
                    </div>
            </div>
            <button className="btn-yellow" onClick={checkout}>Checkout</button>
        </section>
        </>
    )
}

