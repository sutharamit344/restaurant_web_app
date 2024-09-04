import React from 'react'
import "./card.css"

const vegIndianDishes = [
  {
    id: 1,
    image: "http://localhost:3000/assets/vegie/palak_paneer.png",
    name: "Palak Paneer",
    description: "Cottage cheese cubes cooked in a creamy spinach gravy with a blend of spices.",
    price: 250
  },
  {
    id: 2,
    image: "http://localhost:3000/assets/vegie/chole-bhature.png",
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried bread called Bhature.",
    price: 180
  },
  {
    id: 3,
    image: "http://localhost:3000/assets/vegie/malai-kofta.png",
    name: "Malai Kofta",
    description: "Soft and creamy dumplings made from paneer and potatoes, served in a rich gravy.",
    price: 300
  },
  {
    id: 4,
    image: "http://localhost:3000/assets/vegie/masala-dosa.png",
    name: "Masala Dosa",
    description: "A crispy crepe made from rice batter and black lentils, filled with a spicy potato mixture.",
    price: 120
  },
  {
    id: 5,
    image: "http://localhost:3000/assets/vegie/aloo-gobi.png",
    name: "Aloo Gobi",
    description: "A dry curry made with potatoes (aloo) and cauliflower (gobi) cooked with spices.",
    price: 150
  },
  {
    id: 6,
    image: "http://localhost:3000/assets/vegie/baingan-bharta.png",
    name: "Baingan Bharta",
    description: "Smoky-flavored mashed eggplant cooked with tomatoes, onions, and spices.",
    price: 200
  },
  {
    id: 7,
    image: "http://localhost:3000/assets/vegie/dal-tadka.png",
    name: "Dal Tadka",
    description: "Yellow lentils cooked with onions, tomatoes, and tempered with garlic and cumin.",
    price: 130
  },
  {
    id: 8,
    image: "http://localhost:3000/assets/vegie/bhindi-masala.png",
    name: "Bhindi Masala",
    description: "Okra (bhindi) cooked in a tangy tomato-based gravy with spices.",
    price: 170
  },
  {
    id: 9,
    image: "http://localhost:3000/assets/vegie/veg-biryani.png",
    name: "Veg Biryani",
    description: "Aromatic basmati rice cooked with mixed vegetables, herbs, and spices.",
    price: 220
  },
  {
    id: 10,
    image: "http://localhost:3000/assets/vegie/matar-paneer.png",
    name: "Matar Paneer",
    description: "Cottage cheese cubes and green peas cooked in a tomato-based gravy.",
    price: 240
  }
];


export default function Card(props) {

  const vegLength = vegIndianDishes.slice(0, props.length)

  return (
    <>
    {
      vegLength.map((vegie, i) => {
        return (
    <div key={i} className='card'>
    <div className='card-img'>
      <img src={vegie.image} alt={vegie.name} />
      <div className='img-shade'>
        <h3>Get 25% Off</h3>
      </div>
    </div>
    <div className='card-detail'>
      <h3 className='card-title'><span>{vegie.name}</span> <span className='card-price'>₹{vegie.price}/-</span></h3>
      <p className='card-p'>{vegie.description}.</p>
      <a href='/' className='card-btn'>Order Now-.</a>
    </div>
  </div>
        )
      })
    }
    </>
  )
}
