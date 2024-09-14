import React, { useContext, useState } from 'react'
import "./home.css"
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import ReviewCard from '../reviewcard/reviewcard';
import EventCards from '../eventcard/eventcard';
import { FoodContext } from '../foodprovider/foodprovider';
import Card from '../food_card/card';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import { UseDarkMode } from '../darkmode/darkmode';
const origin = window.location.origin;

export const fastFoodItems = [
  {
    id: 2,
    name: "Pepperoni Pizza",
    imageUrl: "/assets/fastfood/pepperoni_pizza.png"
  },
  {
    id: 1,
    name: "Cheeseburger",
    imageUrl: "/assets/fastfood/cheeseburger.png"
  },
  {
    id: 3,
    name: "French Fries",
    imageUrl: "/assets/fastfood/french_friies.png"
  },
  {
    id: 4,
    name: "Fried Rice",
    imageUrl: "/assets/fastfood/fried_rice.png"
  },
  {
    id: 5,
    name: "Vadapav",
    imageUrl: "/assets/fastfood/vadapav.png"
  },
  {
    id: 6,
    name: "Taco",
    imageUrl: "/assets/fastfood/taco.png"
  },
  {
    id: 7,
    name: "Sub Sandwich",
    imageUrl: "/assets/fastfood/subsendwich.png"
  },
  {
    id: 8,
    name: "Nuggets",
    imageUrl: "/assets/fastfood/nuddles.png"
  },
  {
    id: 9,
    name: "Onion Rings",
    imageUrl: "/assets/fastfood/onian_ring.png"
  },
  {
    id: 10,
    name: "Milkshake",
    imageUrl: "/assets/fastfood/milkshake.png"
  }
];


export default function Home() {
const [nextDish, setNextDish] = useState(0)
const {trending} = useContext(FoodContext)
const navigate = useNavigate()
const {darkMode, toggleDarkMode} = useContext(UseDarkMode)

const nextDishHandler = () => {
  nextDish < fastFoodItems.length-1 &&
  setNextDish(nextDish+1)
}

const prevDishHandler = () => {
  nextDish > 0 &&
  setNextDish(nextDish-1)
}


  return (
    <>
    <section id='hero-section' className={`grid `} >
        <div id='promo'>
            <h2>Welcome to</h2>
            <h1 className='h1'><span style={{color:"#ffc61b"}}>R</span>estaurant</h1>
            <p className='p'>Experience the taste of luxury with our exquisite dishes made from the freshest ingredients.</p>
                <h1>Order Over ₹299/- Get 50% Off</h1>
                  <div className='ca-btn-g'>
                    <button className='btn-yellow' onClick={() => navigate("/food-order")} style={{marginRight:"1rem"}}>Order Foods</button>
                    <button className='btn-yellow' onClick={() => navigate("/booking")}>Reserve aTable</button>
                </div>
            </div>
        <div id='instant-food'>
            <div id='scroll-food'>
            <IoIosArrowBack className='arrw-btn' onClick={prevDishHandler} aria-label='previous dish'/>
          <div className='scroller'>
            {
              fastFoodItems.map((dish, i) => {
                return (
                  <div key={i} className='card' style={{transform:`translateX(-${nextDish*100}%)`}}>
                  <div className='dish-img' style={{transform:`rotateZ(-${nextDish*360}deg)`}}>
                  <img src={origin+dish.imageUrl} alt="fast food"/>
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
    <section id='most-item' className={`grid bg-yellow`} >
      <h1 className='h2'>
      <div className='sh'></div>
       Most Served</h1>
      <div className='cards'>
        <Card itemList={trending}/>
      </div>
    </section>
    <section id='review-section' className={`grid bg-dark`}>
      <h1 className='h2'>
      <div className='sh'></div>
       Customer Review</h1>
      <div className='cards'>
      <ReviewCard length="4"/>
      </div>
      </section>
    <section id='event-section' className={`grid bg-yellow`}>
      <h1 className='h2'>
      <div className='sh'></div>
        Events</h1>
      <div className='event-cards'>
      <EventCards length="4" />
      </div>
      </section>
      <Footer/>
    </>
  )
}
