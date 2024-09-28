import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contextapis/cartapi'
import { useNavigate } from 'react-router-dom'
import { IoCall, IoCardOutline, IoHome, IoLocation, IoPerson, IoSearch } from 'react-icons/io5'
import { BiRupee, BiSolidOffer } from 'react-icons/bi'
import { MdArrowDropDown, MdDeliveryDining, MdMail, MdMessage, MdPaid } from 'react-icons/md'
import { MenuContext } from '../contextapis/menuapi'
import { GiCampCookingPot } from 'react-icons/gi'
import "./orders.css"
import { isNumeric } from 'validator'
const location = window.location

export default function Orders() {
    const {orders, bid, setBid} = useContext(CartContext)
    const {menu} = useContext(MenuContext)
    const [openItem, setOpenItem] = useState(null)
    
    return (
        <>
        <section id='order' className='grid'>
            <div className='container'>
                <div className='h-group'>
                <h1 className='h3'>Your Orders</h1>
                <span>
                    <div className='input-group'>
                    <input type="number" name='searchorder' value={bid} onChange={e => setBid(e.target.value)} placeholder='Search order...'/>
                    <span className='input-icon'><IoSearch/></span>
                    </div>
                </span>
                </div>
                <div id='order-Cards'>
                {
                    orders.length && orders.map((order, i) => {
                        return (
                            <div key={i} className='order-card bg-item'>
                                    <div className='item-g'>
                                    <div className='b-item'><span><img src="/assets/img/food-cart.svg" className={`btn-icon svg`} alt="food cart" /></span> {order.cart && order.cart.length} Items</div>
                                    
                                    <MdArrowDropDown className='open-items' onClick={() => setOpenItem( openItem === i+1 ? null : i+1)}/>
                                    <div className={`cart-items bg-item ${i+1 === openItem ? "h-auto" : "h-0"}`}>
                                        {
                                            menu.map((cate, ci) => {
                                                const find = order.cart && order.cart.some((item) => {
                                                    return String(item.itemId)[0] === String(cate.id)
                                                })
                                                if(find){
                                                    return (
                                                        <div key={ci}>
                                                        <div className="category-h ">{cate.category}</div>
                                                        {
                                                            order.cart.map((item, i) => {
                                                                const itemDetail = cate.items[String(item.itemId)[2]-1]
                                                                const offer = Number(itemDetail.offer.split("%")[0]) || 0;
                                                                const price = item.qty * itemDetail.price;
                                                                const save = price * (offer / 100);
                                                                const offerPrice = price - save;

                                                    return(
                                                    String(item.itemId)[0] === String(cate.id) &&

                                                    <div key={i} className="cart-item ">
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
                                                        <div className="output">{item.qty}</div>
                                                    </div>
                                                    <div className="cart-item-price">
                                                        <div>
                                                    <del>₹{itemDetail.price*item.qty}</del>
                                                        </div>
                                                        <div className="cart-item-offer-price">
                                                            <b>₹{offerPrice}</b>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    </div>
                                    <div className='item-g'>
                                    <div className='b-item'><span><IoPerson/></span> {order.name}</div>
                                    <div className='b-item'><span><IoCall/></span> {order.mobile}</div>
                                    <div className='b-item'><span><MdMail/></span> {order.email}</div>
                                    <div className='b-item'><span><IoLocation/></span> {order.address}</div>
                                    {order.message && <div className='b-item'><span><MdMessage/></span> {order.message}</div>}
                                    </div>
                                    <DeliveryBike order={order}/>                                    
                                    </div>
                                    )
                                }).reverse()
                            }
                        </div>
                        
            </div>
        </section>
        </>
      )
}


const DeliveryBike = ({order}) => {
    const navigate = useNavigate()
    const {cancelOrder} = useContext(CartContext)

    const getTimeDeff = () => {
        const timeDifferenceInSeconds = (new Date() - new Date(order.payTime)) / 1000;
        const newLeftPosition = Math.floor(timeDifferenceInSeconds / (600 / 100));
        return newLeftPosition
    }

    const [bikeLeft, setBikeLeft] = useState()

    useEffect(() => {
    setBikeLeft(getTimeDeff);
    },[])

    const goToPayment = (objId) => {
        navigate(`/conf-payment/${objId}/orders/Order/orders`)
    }
    useEffect(() => {
        if(bikeLeft < 101 && order.paymentStatus && order.orderStatus){
        if (order.payTime) {
            const interval = setInterval(() => {
                setBikeLeft(getTimeDeff);
            }, 500);

            return () => clearInterval(interval);
        }}
    }, [order.payTime]);

    return (
        <>
        <div className='item-g'>
        <div className='b-item'><span><IoCardOutline/></span> {order.cardType}</div>
        <div className='b-item'><span><BiRupee/></span>{order.amount}/- </div>
        <div className='b-item'><span>Order Id :</span>{order.objId}</div>
        <div className='b-item'>
        {
        order.paymentStatus ? 
        order.orderStatus ?
        <>
        <span><MdPaid/> Paid</span> 
        {order.paymentStatus && bikeLeft < 50 && <button className='cancel-btn'  onClick={() => cancelOrder(order.objId)}>Cancel order</button>}
        </>: <span className='highlight'>Order Canceled.</span>
        : <>
        <button className='pay-btn'  onClick={() => goToPayment(order.objId)}>Pay</button>
        </>}
        </div>
        </div>
        <div className='item-g '>
        <div className='b-item order-status'>
            <div className='b-times'>
                {order.payTime ? 
                <span>Conf: {String(new Date(order.payTime).toLocaleString())}</span>
                : <span className='highlight'>Order Confirm after payment</span>}
                {
                order.orderStatus && bikeLeft > 99 &&  `Delivered: ${new Date(new Date(order.payTime).getTime() + (1000 * 60 * 10)).toLocaleTimeString()}`
                }
            </div>
            <div className='progress-bar'>
            <span className={`${order.orderStatus && bikeLeft > 0 ? "d-status-true" : "d-status-false"}`}><GiCampCookingPot/></span>
            <div className='delivery-route'>
            <span className='bike'  style={{ left: bikeLeft + "%" }} ><MdDeliveryDining/></span>
            </div>
            <span className={`${order.orderStatus && bikeLeft > 99 ? "d-status-true" : "d-status-false"}`}><IoHome/></span>
            </div>
        </div>
        </div>
        
        </>
    )
}