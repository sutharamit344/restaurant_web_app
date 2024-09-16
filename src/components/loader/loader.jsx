import React, { useEffect, useRef } from 'react';
import './loader.css';
import i1 from './img/item1.png';
import i2 from './img/item2.png';
import i3 from './img/item3.png';
import i4 from './img/item4.png';
import i5 from './img/item5.png';

export default function Loader() {
  const scroller = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const firstImg = scroller.current.querySelector('img:nth-of-type(1)');
      scroller.current.appendChild(firstImg);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='loader'>
      <div className='loader-item' ref={scroller}>
        <img src={i1} alt='loading' />
        <img src={i2} alt='loading' />
        <img src={i3} alt='loading' />
        <img src={i4} alt='loading' />
        <img src={i5} alt='loading' />
        <img src={i1} alt='loading' />
        <img src={i2} alt='loading' />
      </div>
    </div>
  );
}
