import React, { useEffect, useState } from 'react'
import "./home.css"
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import Card from "../food_card/card"
import ReviewCard from '../reviewcard/reviewcard';
import EventCards from '../eventcard/eventcard';
import Footer from "../footer/footer"
const domain = window.location;

export const fastFoodItems = [
  {
    id: 1,
    name: "Cheeseburger",
    imageUrl: "assets/fastfood/cheeseburger.png"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    imageUrl: "assets/fastfood/pepperoni_pizza.png"
  },
  {
    id: 3,
    name: "French Fries",
    imageUrl: "assets/fastfood/french_friies.png"
  },
  {
    id: 4,
    name: "Fried Rice",
    imageUrl: "assets/fastfood/fried_rice.png"
  },
  {
    id: 5,
    name: "Vadapav",
    imageUrl: "assets/fastfood/vadapav.png"
  },
  {
    id: 6,
    name: "Taco",
    imageUrl: "assets/fastfood/taco.png"
  },
  {
    id: 7,
    name: "Sub Sandwich",
    imageUrl: "assets/fastfood/subsendwich.png"
  },
  {
    id: 8,
    name: "Nuggets",
    imageUrl: "assets/fastfood/nuddles.png"
  },
  {
    id: 9,
    name: "Onion Rings",
    imageUrl: "assets/fastfood/onian_ring.png"
  },
  {
    id: 10,
    name: "Milkshake",
    imageUrl: "assets/fastfood/milkshake.png"
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
  console.log(window.innerWidth)
})


  return (
    <>
    
    <section id='hero-section' className='grid'>
        <div id='promo'>
            <h2>Welcome to</h2>
            <h1 className='h1'><span style={{color:"#ffc61b"}}>R</span>estaurant</h1>
            <p className='p'>Experience the taste of luxury with our exquisite dishes made from the freshest ingredients.</p>
                <h1>Order Over ₹299/- Get 50% Off</h1>
                  <div className='ca-btn-g'>
                    <button className='btn-yellow' style={{marginRight:"1rem"}}>Order Foods</button>
                    <button className='btn-yellow'>Reserve aTable</button>
                </div>
            </div>
        <div id='instant-food'>
            <div id='scroll-food' style={{backgroundImage: `url("${domain}assets/img/logo.png")`}}>
            <IoIosArrowBack className='arrw-btn' onClick={prevDishHandler}/>
          <div className='scroller'>
            {
              fastFoodItems.map((dish, i) => {
                return (
                  <div key={i} className='card' style={{transform:`translatex(-${nextDish*100}%)`}}>
                  <div className='dish-img' style={{transform:`rotatez(-${nextDish*360}deg)`}}>
                  <img src={domain+dish.imageUrl} alt="fast food"/>
                  </div>
                  <h2>{dish.name}</h2>
                  </div>
                )
              })
            }
          </div>
            <IoIosArrowForward className='arrw-btn' onClick={nextDishHandler}/>
            </div>
        </div>
    </section>
    <section id='week-special' className='grid'>
      <h1 className='h2'>
      <div className='sh1'></div>
       This week's special</h1>
      <div className='cards'>
      <Card length="4"/>
      </div>
    </section>
    <section id='review-section' className='grid'>
      <h1 className='h2'>
      <div className='sh2'></div>
       Customer Review</h1>
      <div className='cards'>
      <ReviewCard length="4"/>
      </div>
      </section>
    <section id='event-section' className='grid'>
      <h1 className='h2'>
      <div className='sh1'></div>
        Events</h1>
      <div className='event-cards'>
      <EventCards length="4"/>
      </div>
      </section>
      <Footer/>
    </>
  )
}
