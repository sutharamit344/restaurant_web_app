import React, { useState } from "react"
import "./foodcart.css"
import CartItem from "./cartitem"

export default function FoodCart() {
    const [toggleCart, setToggleCart] = useState(false)

    const handleToggleCart = () => {
        setToggleCart(!toggleCart)
    }

    return (
        <>
        <section id="black-wall" onClick={handleToggleCart} className={toggleCart ? "black-wall-show" : "black-wall-hide"}></section>
        <section id="cart" className={toggleCart ? "cart-show" : "cart-hide"}>
            <div className="cart-knob" onClick={handleToggleCart}>
                <div className="knob-btn">
            <img src="http://localhost:3000/assets/img/food-cart.svg" className={toggleCart ? "icon-flip" : ""} alt="food cart" />
                </div>
            </div>
            <h1>Cart items</h1>
            <CartItem/>
                <div className="cart-subtotal">
                    <div>
                        Sub total
                    </div>
                    <div className="cart-total">
                        <b>3848</b>
                    </div>
            </div>
            <button className="btn-yellow">Checkout</button>
        </section>
        </>
    )
}

