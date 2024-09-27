import React, { useContext } from 'react'
import Card from '../food_card/card'
import Footer from '../footer/footer'
import { MenuContext } from '../contextapis/menuapi'

export default function Foods() {

  const {menu} = useContext(MenuContext)
  
  return (
    <>
    <section id='menu' className='grid'>
      {
        menu.map(categories => {
          return (
          <div key={categories.id} className='categories-box'>
          <h2><div className='sh1'></div>{categories.category}</h2>
          <div className='cards'>
            <Card itemList={categories.items}/>
          </div>
          </div>
          )
        })
      }
    </section>
    <Footer/>
    </>
  )
}
