import React from 'react'
import "./eventcard.css"
const domain = window.location.origin+"/";

const indianFestivalEvents = [
    {
      id: 1,
      eventName: "Holi Bash",
      date: "2024-03-24",
      description: "Join us for a vibrant Holi party with colors, music, and a delicious spread of festive foods like gujiya and thandai.",
      image: "holi.png"
    },
    {
      id: 2,
      eventName: "Independence Day Feast",
      date: "2024-08-15",
      description: "Celebrate India's Independence Day with a patriotic feast featuring regional Indian cuisines, live music, and flag hoisting.",
      image: "independence-day.png"
    },
    {
      id: 3,
      eventName: "Navaratri Special",
      date: "2024-10-02",
      description: "Celebrate the nine nights of Navaratri with a special menu of vrat-friendly dishes, cultural performances, and Garba night.",
      image: "navaratri.png"
    },
    {
      id: 4,
      eventName: "Diwali Celebration",
      date: "2024-11-12",
      description: "Celebrate the festival of lights with a grand Diwali feast, featuring traditional Indian sweets and special festive dishes.",
      image: "diwali.png"
    }
  ];
  

export default function EventCards(props) {

    const events = indianFestivalEvents.slice(0, props.length).reverse();

  return (
    events.map((eve, i) => {
        return(
            <div key={eve.id} className='event-card' style={{backgroundImage: `url("${domain}assets/eventimg/${eve.image}")`}}>
                <div className='event-content'>
                <div className='event-header'><h3>{eve.eventName}</h3> <p className=''>{eve.date}</p></div>
                <p className='event-des'>{eve.description}</p>
                </div>
            </div>
        )
    })
  )
}
