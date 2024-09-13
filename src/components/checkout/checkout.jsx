import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Payment from '../paymentmethods/payment';
import { IoLocation } from 'react-icons/io5';
import FoodCart from '../foodcart/foodcart';
const location = window.location.origin;

export default function Checkout() {
  const path = useLocation()
  const step = path.pathname;
  const navigate = useNavigate()

    const nextStep = (e) => {
        e.preventDefault();
        switch(step){
            case "/checkout" : {
                navigate("/delivery-address")
                break
            }
            case "/delivery-address" : {
                navigate("/delivery-payment")
                break
            }
            case "/delivery-payment" : {
                navigate("/conf-payment")
                break
            }
            default : {
                break
            }
        }
      };

    const prevStep = (e) => {
        e.preventDefault()
        switch(step){
            case "/delivery-payment" : {
                navigate("/delivery-address")
                break
            }
            case "/delivery-address" : {
                navigate("/checkout")
                break
            }
            default : {
                break
            }
        }
    }
  

  return (
    <>
    <section id='checkout' className='grid'>
        <div id='form-body'>
          
        <div className={`form-box ${step === "/delivery-payment" ? "" : "hidden"}`}>
                <Payment nextPath={nextStep} prevPath={prevStep}/>
                </div>
            <div className={`table-box ${step === "/checkout" ? "" : "hidden"}`}>
              <table>
                <thead>
                  <tr>
                    <th className='t-left'>
                    <h1 className='h2'>Bill Detail</h1></th>
                    <th className='t-right'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='t-left'>Item Total</td>
                    <td className='t-right'>876</td>
                  </tr>
                  <tr>
                    <td className='t-left'>Delivery Fee</td>
                    <td className='t-right'>876</td>
                  </tr>
                  <tr>
                    <td className='t-left'>Delivery Tip</td>
                    <td className='t-right'>876</td>
                  </tr>
                  <tr>
                    <td className='t-left'>GST</td>
                    <td className='t-right'>876</td>
                  </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className='t-left'>Total</th>
                      <th className='t-right'>1234</th>
                    </tr>
                  </tfoot>
              </table>
              <div>
              <input type="button" value="Continue" onClick={nextStep} className='btn-yellow form-btn'/>
              </div>
            </div>
            <div className='image' style={{backgroundImage: `url("${location}/assets/img/rimg2.png")`}}></div>
                <div className={`form-box ${step === "/delivery-address" ? "" : "hidden"}`}>
                <form className="form-col-2">
                    <h2 className="h2 col-2">Delivery Address</h2>
                    <div className="form-control">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name"/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name"/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="mobile">Mobile No.</label>
                        <input type="number" name="mobile" id="mobile" placeholder="+91"/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="billEmail">Email</label>
                        <input type="email" name="billEmail" id="billEmail" placeholder="Your email"/>
                    </div>
                    <div className="form-control col-2">
                        <label htmlFor="request">Location / url</label>
                        <div className='input-group'>
                          <input type="text" placeholder='Address'/>
                        <span className="input-icon"><IoLocation/></span>
                        </div>
                    </div>
                    <div className="form-control col-2">
                        <label htmlFor="request">Special request</label>
                        <textarea name="request" id="request" rows="2" placeholder="Special request"></textarea>
                    </div>
                    <input type="submit" onClick={nextStep} value="Continue" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Back" className="btn-yellow form-btn"/>
                </form>
                </div>
        </div>
    </section>
    <FoodCart/>
    </>
  )
}
