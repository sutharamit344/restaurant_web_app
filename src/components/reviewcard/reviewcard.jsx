import React, { useContext } from 'react'
import "./reviewcard.css"
import { FaStar } from "react-icons/fa6";
import { UseDarkMode } from '../darkmode/darkmode';
const domain = window.location.origin+"/";

export const RatingStar = ({rating}) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar key={i} color={i <= rating ? "#ffc61b" : "gray"} />
    );
  }

  return <div>{stars}</div>;
}



const restaurantReviews = [
    {
      id: 1,
      reviewerName: "Amit Kumar",
      reviewerImage: "assets/reviewverimg/amit.png",
      rating: 4,
      comment: "Great food and ambiance. The service was a bit slow, but overall a good experience!",
      date: "2024-09-01"
    },
    {
      id: 2,
      reviewerName: "Riya Sharma",
      reviewerImage: "assets/reviewverimg/riya.png",
      rating: 4,
      comment: "Amazing seafood! The flavors were spot on and the staff was very friendly.",
      date: "2024-08-28"
    },
    {
      id: 3,
      reviewerName: "Vikram Patel",
      reviewerImage: "assets/reviewverimg/vikram.png",
      rating: 3,
      comment: "The place has a cool vibe, but the food was just average. Could improve on the taste.",
      date: "2024-08-25"
    },
    {
      id: 4,
      reviewerName: "Neha Gupta",
      reviewerImage: "assets/reviewverimg/neha.png",
      rating: 4,
      comment: "Loved the coffee and desserts! A perfect spot to chill with friends.",
      date: "2024-08-22"
    },
    {
      id: 5,
      reviewerName: "Rohit Singh",
      reviewerImage: "assets/reviewverimg/rohit.png",
      rating: 4,
      comment: "Authentic Indian flavors with a modern twist. Highly recommend the butter chicken!",
      date: "2024-08-20"
    }
  ];
  
  

export default function Reviewcard(props) {

  const {darkMode} = useContext(UseDarkMode)

    const review = restaurantReviews.slice(0, props.length)

  return (
    <>
    {
        review.map((rev, i) => {
            return (
                <div key={i} className={`review-card  ${darkMode ? "bg-item" : "bg-light"}`}>
                    <div className='review-img'>
                        <img src={domain+rev.reviewerImage} alt={rev.reviewerName} />
                    </div>
                    <h3 className='review-title'>{rev.reviewerName}</h3>
                    <div className='review-star'>
                      <RatingStar rating={rev.rating}/>
                    </div>
                    <p className='card-p'>
                        {rev.comment}
                    </p>
                    <p className='card-p card-date'>{rev.date}</p>
                </div>
            )
        })
    }
    </>
  )
}
