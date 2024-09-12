import React from 'react'
import "./card.css"
import { BsCartDashFill, BsCartPlusFill } from 'react-icons/bs'



export default function Card({itemList}) {
  

  return (
    <>
    {
      itemList.map((item, i) => {
        return (
    <div key={i} className='card'>
    <div className='card-img'>
      <img src={`http://localhost:3000/assets/foods/${item.image}`} alt={item.image} />
      <div className='img-shade'>
        <h3>Get 25% Off</h3>
      </div>
    </div>
    <div className='card-detail'>
      <div>
      <h3 className='card-title'><span className='item-name'>{item.name}</span></h3>
      <p className='card-p'>{item.description}.</p>
      </div>
      <div className='card-bottom'>
      <h3 className='card-price'>₹{item.price}/-</h3>
      <button className='remove-btn hidden'><BsCartDashFill/> Remove</button>
      <button className='add-btn'><BsCartPlusFill/> Add</button>
      </div>
    </div>
  </div>
        )
      })
    }
    </>
  )
}
