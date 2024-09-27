import React, { useContext } from "react"
import "./foodcart.css"
import CartItem from "./cartitem"
import { useNavigate } from "react-router-dom"
import { UseDarkMode } from "../darkmode/darkmode"
import { IoClose } from "react-icons/io5"
import { CartContext } from "../contextapis/cartapi"
import { MenuContext } from "../contextapis/menuapi"
import { AuthUserContext } from "../contextapis/authuserapi"
export default function FoodCart({cart}) {
    const {login} = useContext(AuthUserContext)
    const {darkMode} = useContext(UseDarkMode)
    const {menu} = useContext(MenuContext)
    const  {subTotal, items, handleSetItems, handleRemoveItem} = useContext(CartContext)
    const navigate = useNavigate()

    const checkout = () => {
        navigate("/checkout")
        cart.handleToggleCart()
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
                <h1>Cart items </h1>
                <IoClose onClick={cart.handleToggleCart}/>
            </div>
            
        <div className={`cart-items bg-item`}>
            {
                
                menu.map((cate, ci) => {
                    const find = items.some((item) => {
                        return String(item.itemId)[0] === String(cate.id)
                    })
                    if(find){
                        return (
                            <div key={ci}>
                            <div className="category-h">{cate.category}</div>
                            {
                                items.map((item, i) => {
                                    const itemDetail = cate.items[String(item.itemId)[2]-1]
                                    const offer = Number(itemDetail.offer.split("%")[0]) || 0;
                                    const price = item.qty * itemDetail.price;
                                    const save = price * (offer / 100);
                                    const offerPrice = price - save;
                                    return(
                                    String(item.itemId)[0] === String(cate.id) &&
                                    <CartItem key={`${i}${ci}`} save={save} offerPrice={offerPrice} itemDetail={itemDetail} qty={item.qty} handleItem={{handleSetItems, handleRemoveItem}}/>
                                )
                                })
                            }
                            </div>
                            )
                    }else{
                        return null
                    }
                })
            }
        </div>
      <div className="cart-botttom">
      <button className="btn-yellow" onClick={checkout}>Checkout</button>
      <div className={`cart-subtotal bg-item`}>
                    <div>
                        Sub total
                    </div>
                    <div className="cart-total">
                        <b>₹{subTotal}</b>
                    </div>
                </div>
      </div>
        </section>
        </>
    )
}

