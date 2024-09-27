import React from "react"
import { BiSolidOffer } from "react-icons/bi"

const location = window.location

export default function CartItem({offerPrice, itemDetail, qty, handleItem}) {

    return (
        <>
                    <div className="cart-item">
                        <div className="cart-item-img">
                            <img src={`${location.origin}/assets/foods/${itemDetail.image}`} alt={itemDetail.name} />
                        </div>
                        <div className="cart-item-detail">
                            <div className="cart-item-name">
                                <h3>{itemDetail.name}</h3>
                            </div>
                            <div className="cart-item-offer">
                            ₹{itemDetail.price} <BiSolidOffer/> {itemDetail.offer} 
                            </div>
                        </div>
                        <div className="cart-item-qty-btn">
                            <button className="cart-item-dec" onClick={() => handleItem.handleRemoveItem(itemDetail.id)}>-</button>
                            <div className="output">{qty}</div>
                            <button className="cart-item-inc" onClick={() => handleItem.handleSetItems(itemDetail.id)}>+</button>
                        </div>
                        <div className="cart-item-price">
                            <div>
                        <del>₹{itemDetail.price*qty}</del>
                            </div>
                            <div className="cart-item-offer-price">
                                <b>₹{offerPrice}</b>
                            </div>
                        </div>
                    </div>
        </>
    )
}