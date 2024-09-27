import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoLocation, IoCalendar, IoCall, IoCard, IoCardOutline, IoMail, IoPerson} from "react-icons/io5";
import Payment from '../paymentmethods/payment';
import { MdMessage } from "react-icons/md";
import { CartContext } from '../contextapis/cartapi';
import { AuthUserContext } from '../contextapis/authuserapi';
const location = window.location;

export default function Checkout() {
  const {login} = useContext(AuthUserContext)
  const path = useLocation()
  const step = path.pathname;
  const navigate = useNavigate()
  const {ordersObj, subTotal, ordersdata, handleSetOrder, complexField} = useContext(CartContext)
  const [field, setField] = useState(complexField)
  const [bill, setBill] = useState({...ordersObj})

  const valid = {
    isFname: field.fname,
    isLname: field.lname,
    isMobile: bill.mobile,
    isEmail: bill.email,
    isRquest: bill.message,
    isDelivery: field.fname && bill.mobile? true : false,
    isCardDetail: field.cardType && field.cardHolder && field.exMonth && field.exYear && field.cvv && field.cardNum1 && field.cardNum2 && field.cardNum3 && field.cardNum4? true : false
}
  useEffect(() => {
    setBill({...bill,
      dfee: 40,
      gst: ((subTotal+40)*(18/100)).toFixed(1),
      gTotal: (subTotal+((subTotal+40)*(18/100))+40).toFixed(0)
    })
  },[login, subTotal])
  
  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setBill({...bill, [name]: value})
  }

  const handleComplexInput = (e) => {
    let {name, value} = e.target;
    setField({...field, [name]: value})
  }

  const  goToPayment = () => {
    if (confData) {
      const newOrder = {...bill, objId: ordersdata.current.length+1}
      handleSetOrder(newOrder)
      navigate(`/conf-payment/${ordersdata.current.length+1}/orders/Order/orders`)
    }
  };

  const confAll = !valid.isDelivery && !valid.isCardDetail;
  const confData = valid.isDelivery && valid.isCardDetail;

  const handleOrder = (e) => {
    e.preventDefault();
    setField((prev) => {
        return {...prev, submited: true}
  })

  if(valid.isCardDetail && location.pathname === "/delivery-payment"){
  navigate("/delivery-overview")
  setBill((prev) => {
    return {...prev,
        name: field.fname+" "+field.lname,
        cardType: field.cardType,
        cardHolder: field.cardHolder,
        exDate: field.exMonth+" "+field.exYear,
        cvv: field.cvv,
        cardNum: field.cardNum1+" "+field.cardNum2+" "+field.cardNum3+" "+field.cardNum4,
        userId: login.id,
        amount: subTotal,
        paymentStatus: false
    }
})
  }
}


    const nextStep = (e) => {
        e.preventDefault();
        setField((prev) => {
            return {...prev, submited: true}
        })
        switch(step){
            case "/checkout" : {
                navigate("/delivery-address")
                setField((prev) => {
                    return {...prev, submited: false}
                })
                break
            }
            case "/delivery-address" : {
              if(valid.isDelivery){
                navigate("/delivery-payment")
                setField((prev) => {
                  return {...prev, submited: false}
              })
              }
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
            case "/delivery-overview" : {
                navigate("/delivery-payment")
                break
            }
            default : {
                break
            }
        }
    }
  
  
    useEffect(() => {
      if(location.pathname !== "/checkout"){
          if(location.pathname !== "/delivery-address"){
            if(confAll){
              navigate(-1)
          }}
      }
    })

    
    useEffect(() => {
      document.getElementsByName("fname")[0].focus()
      document.getElementsByName("cardType")[0].focus()
    },[navigate])

  return (
    <>
    <section id='checkout' className='grid'>
        <div id='form-body'>
        <div className={`form-box empyty-cart ${!subTotal ? "" : "hidden"}`}>
            <div>Your cart is empty.</div>
            <Link to="/food-order" style={{color: "lightgray"}}>Add to food cart</Link>
          </div>
            <div className={`table-box ${step === "/checkout" && subTotal ? "" : "hidden"}`}>
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
                    <td className='t-right'>{subTotal.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td className='t-left'>Delivery Fee</td>
                    <td className='t-right'>{bill.dfee}</td>
                  </tr>
                  <tr>
                    <td className='t-left'>GST</td>
                    <td className='t-right'>{bill.gst}</td>
                  </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className='t-left'>Total</th>
                      <th className='t-right'>₹{bill.gTotal}</th>
                    </tr>
                  </tfoot>
              </table>
              <div>
              <input type="button" value="Continue" onClick={nextStep} className='btn-yellow form-btn'/>
              </div>
            </div>
            

            <div className='image' style={{backgroundImage: `url("${location.origin}/assets/img/rimg2.png")`}}></div>

            
            <div className={`form-box ${step === "/delivery-payment" ? "" : "hidden"}`}>
                <Payment prevPath={prevStep} formData={field} handleCard={handleOrder} handleComplexInput={handleComplexInput}/>
                </div>
            
            <div className={`form-box ${subTotal && step === "/delivery-address" ? "" : "hidden"}`}>
                <form className="form-col-2">
                    <h2 className="h2 col-2">Contact Detail</h2>
                    <div className="form-control">
                        <label htmlFor="firstName">First Name <sup>*</sup></label>
                        <input type="text" name="fname" id="firstName" placeholder="First Name"
                        value={field.fname} onChange={handleComplexInput} />
                        {field.submited && !valid.isFname && <div className="error-msg">First name is required.</div>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lname" id="lastName" placeholder="Last Name"
                        value={field.lname} onChange={handleComplexInput} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="mobile">Mobile No. <sup>*</sup></label>
                        <input type="mobile" name="mobile" id="mobile" placeholder="+91"
                        value={bill.mobile} onChange={handleInputChange} />
                        {field.submited && !valid.isMobile && <div className="error-msg">Mobile number is required.</div>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="billEmail">Email</label>
                        <input type="email" name="email" id="billEmail" placeholder="Your email"
                        value={bill.email} onChange={handleInputChange}
                        autoComplete='email' />
                    </div>
                    
                    <div className="form-control col-2">
                        <label htmlFor="address">Location / url <sup>*</sup></label>
                        <div className='input-group'>
                          <input type="text" name='address' id='address' placeholder='Address'
                          value={bill.address} onChange={handleInputChange} 
                          autoComplete='address'/>
                        <span className="input-icon"><IoLocation/></span>
                        </div>
                    </div>
                    <div className="form-control col-2">
                        <label htmlFor="message">Special message</label>
                        <textarea name="message" id="message" rows="2" placeholder="Special message"
                        value={bill.message} onChange={handleInputChange} ></textarea>
                    </div>
                    <input type="submit" onClick={nextStep} value="Continue" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Back" className="btn-yellow form-btn"/>
                </form>
                </div>
                
                <div className={`form-box ${step === "/delivery-overview" ? "" : "hidden"}`}>
                <div className="form-col-2 overview">
                    <h2 className="h2">Overview</h2>
                    <div className="overview-row col-2">
                        <h3>bill</h3>
                        <ul className="overview-ul">
                            <li>Total: {bill.gTotal}</li>
                        </ul>
                    </div>
                    <div className="overview-row col-2">
                        <h3>Contact detail</h3>
                        <ul className="overview-ul">
                        <li><IoPerson/>{field.fname} {field.lname}</li>
                        <li><IoCall/>{bill.mobile}</li>
                        <li><IoMail/>{bill.email}</li>
                        <li><IoLocation/>{bill.address}</li>
                        <li><MdMessage/>{bill.message}</li>
                        </ul>
                    </div>
                    <div className="overview-row col-2">
                        <h3>Payment Method</h3>
                        <ul className="overview-ul">
                        <li><IoCard/>{bill.cardType}</li>
                        <li><IoPerson/>{bill.cardHolder}</li>
                        <li><IoCalendar/>{field.exMonth}/{field.exYear}</li>
                        <li>CVV: {bill.cvv}</li>
                        <li><IoCardOutline/>{bill.cardNum}</li>
                        </ul>
                    </div>
                    <div className="overview-row col-2">
                        <h3>Payble Amount</h3>
                        <ul className="overview-ul">
                            <li>Your Total Payble Amount : <b>₹{bill.gTotal}/-</b></li>
                        </ul>
                    </div>
                    <input type="submit" onClick={goToPayment} value="Confirm" className="btn-yellow form-btn"/>
                    <input type="submit" onClick={prevStep} value="Cancel" className="btn-yellow form-btn"/>
                </div>
                </div>
        </div>
    </section>
    </>
  )
}
