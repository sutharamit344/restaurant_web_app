import React, { useContext } from "react"
import "./foodcart.css"
import CartItem from "./cartitem"
import { useNavigate } from "react-router-dom"
import { UseDarkMode } from "../darkmode/darkmode"
import { IoClose } from "react-icons/io5"

export default function FoodCart({cart}) {
    const {darkMode} = useContext(UseDarkMode)
    const navigate = useNavigate()

    const checkout = () => {
        navigate("/checkout")
    }

    return (
        <>
        <section id="black-wall" onClick={cart.handleToggleCart} className={cart.toggleCart ? "black-wall-show" : "black-wall-hide"}></section>
        <section id="cart" className={`${cart.toggleCart ? "cart-show" : "cart-hide"} ${darkMode ? "bg-dark" : "bg-light"}`}>
            <div className="cart-knob bg-item" onClick={cart.handleToggleCart}>
                <div className="knob-btn">
            <img src="/assets/img/food-cart.svg" className={`svg ${cart.toggleCart ? "icon-flip" : ""}`} alt="food cart" />
                </div>
            </div>
            <div className="h-group">
                <h1>Cart items</h1>
                <IoClose onClick={cart.handleToggleCart}/>
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

