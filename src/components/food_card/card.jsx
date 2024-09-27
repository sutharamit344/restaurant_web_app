import React, { useContext } from 'react'
import "./card.css"
import { BsCartDashFill, BsCartPlusFill } from 'react-icons/bs'
import { CartContext } from '../contextapis/cartapi'


export default function Card({itemList}) {
  const {items, handleSetItems, handleRemoveItem, complexField} = useContext(CartContext)
  const location = window.location
  
  return (
    <>
    {
      itemList.map((item, i) => {
        const inCart = items.some(cartItem => cartItem.itemId === item.id)
        return (
    <div key={i} className={`card  bg-item`}>
    <div className='card-img'>
      <img src={`${location.origin}/assets/foods/${item.image}`} alt={item.image} />
      <div className='img-shade'>
        <h3>{item.offer}</h3>
      </div>
    </div>
    <div className='card-detail'>
      <div>
      <h3 className='card-title'><span className='item-name'>{item.name}</span></h3>
      <p className='card-p'>{item.description}.</p>
      </div>
      <div className='card-bottom'>
      <h3 className='card-price'>₹{item.price}/-</h3>
      {
        inCart ? <button className='remove-btn' onClick={() => handleRemoveItem(item.id)}>
        <img src="/assets/img/food-cart.svg" className={`btn-icon svg`} alt="food cart" /> Remove</button>
        : <button className='add-btn' onClick={() => handleSetItems(item.id)}>
        <img src="/assets/img/food-cart.svg" className={`btn-icon svg`} alt="food cart" /> Add</button>
      }
      </div>
    </div>
  </div>
        )
      })
    }
    </>
  )
}
