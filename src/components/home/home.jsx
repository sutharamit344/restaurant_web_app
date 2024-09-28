import React, { useContext, useState } from 'react'
import "./home.css"
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import ReviewCard from '../reviewcard/reviewcard';
import EventCards from '../eventcard/eventcard';
import Card from '../food_card/card';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import { MenuContext } from '../contextapis/menuapi';
import { MdDeliveryDining } from 'react-icons/md';
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
const {trending} = useContext(MenuContext)
const navigate = useNavigate()

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
            <h2 style={{display: "flex", alignItems: "center", gap: "1rem"}}><MdDeliveryDining className='bg-yellow' style={{fontSize: "40px", borderRadius:"8px", padding: "4px"}}/> Delivery in 10 Min.</h2>
                <h1><div>Order Over ₹299/-</div><div> Get 50% Off</div></h1>
                  <div className='ca-btn-g'>
                    <button className='btn-yellow' onClick={() => navigate("/food-order")} style={{marginRight:"1rem"}}>Order Foods</button>
                    <button className='btn-yellow' onClick={() => navigate("/booking")}>Reserve aTable</button>
                </div>
            </div>
        <div id='instant-food'>
            <div id='scroll-food'>
            <IoIosArrowBack className='arrw-btn arrow-back' onClick={prevDishHandler} aria-label='previous dish'/>
          <div className='scroller'>
            {
              fastFoodItems.map((dish, i) => {
                return (
                  <div key={i} className='card' style={{transform:`translateX(-${nextDish*100}%)`}}>
                  <div className='dish-img' style={{transform:`rotateZ(-${nextDish*360}deg)`}}>
                  <img src={origin+dish.imageUrl} alt="fast food" style={{transform: `scale(${nextDish === i ? "1":"0"})`}}/>
                  </div>
                  <h2>{dish.name}</h2>
                  </div>
                )
              })
            }
          </div>
            <IoIosArrowForward className='arrw-btn arrow-forward' onClick={nextDishHandler}/>
            </div>
        </div>
    </section>
    <section id='most-item' className={`grid bg-yellow`} >
      <h1 className='h2'>
      <div className='sh'></div>
       Most Served</h1>
      <div className='cards fix-card'>
        <Card itemList={trending}/>
      </div>
      
      <h1 className='h2'>
      <div className='sh'></div>
       Customer Review</h1>
      <div className='cards fix-card'>
      <ReviewCard length="4"/>
      </div>
      </section>
    <section id='event-section' className={`grid`}>
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
