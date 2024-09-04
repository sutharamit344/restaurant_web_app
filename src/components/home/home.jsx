import React, { useEffect, useState } from 'react'
import "./home.css"
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { BsTranslate } from 'react-icons/bs';

export const fastFoodItems = [
  {
    id: 1,
    name: "Cheeseburger",
    imageUrl: "http://localhost:3000/assets/fastfood/cheeseburger.png"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    imageUrl: "http://localhost:3000/assets/fastfood/pepperoni_pizza.png"
  },
  {
    id: 3,
    name: "French Fries",
    imageUrl: "http://localhost:3000/assets/fastfood/french_friies.png"
  },
  {
    id: 4,
    name: "Fried Rice",
    imageUrl: "http://localhost:3000/assets/fastfood/fried_rice.png"
  },
  {
    id: 5,
    name: "Vadapav",
    imageUrl: "http://localhost:3000/assets/fastfood/vadapav.png"
  },
  {
    id: 6,
    name: "Taco",
    imageUrl: "http://localhost:3000/assets/fastfood/taco.png"
  },
  {
    id: 7,
    name: "Sub Sandwich",
    imageUrl: "http://localhost:3000/assets/fastfood/subsendwich.png"
  },
  {
    id: 8,
    name: "Nuggets",
    imageUrl: "http://localhost:3000/assets/fastfood/nuddles.png"
  },
  {
    id: 9,
    name: "Onion Rings",
    imageUrl: "http://localhost:3000/assets/fastfood/onian_ring.png"
  },
  {
    id: 10,
    name: "Milkshake",
    imageUrl: "http://localhost:3000/assets/fastfood/milkshake.png"
  }
];


export default function Home() {
const [nextDish, setNextDish] = useState(0)

const nextDishHandler = () => {
  nextDish < 9 &&
  setNextDish(nextDish+1)
}

const prevDishHandler = () => {
  nextDish > 0 &&
  setNextDish(nextDish-1)
}

useEffect(() => {
  console.log(nextDish)
})


  return (
    <>
    
    <section id='hero-section' className='grid'>
        <div id='promo'>
            <h2>Welcome to</h2>
            <h1 className='h1'><span style={{color:"#ffc61b"}}>R</span>estaurant</h1>
            <p className='p'>Experience the taste of luxury with our exquisite dishes made from the freshest ingredients.</p>
                <h1>Order Over ₹299/- Get 50% Off</h1>
                <button className='btn-yellow'>Order Foods</button>
            <button className='btn-yellow'>Reserve aTable</button>
            </div>
        <div id='instant-food'>
            <div id='scroll-food'>
          <div onClick={prevDishHandler}>
            <IoIosArrowBack className='arrw-btn'/>
          </div>
          <div className='scroller'>
            {
              fastFoodItems.map((dish, i) => {
                return (
                  <div key={i} className='card' style={{transform:`translatex(-${nextDish*100}%)`}}>
                  <div className='dish-img' style={{transform:`rotatez(-${nextDish*360}deg)`}}>
                  <img src={dish.imageUrl} alt="fast food"/>
                  </div>
                  <h2>{dish.name}</h2>
                  </div>
                )
              })
            }
          </div>
          <div onClick={nextDishHandler}>
            <IoIosArrowForward className='arrw-btn'/>
          </div>
            </div>
        </div>
    </section>
    <section className='grid'>
      <h1 className='h1'>This week's special</h1>
    </section>
    </>
  )
}
