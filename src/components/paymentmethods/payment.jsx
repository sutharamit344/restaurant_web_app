import React from 'react'
import { IoCardOutline } from 'react-icons/io5';

export default function Payment({nextPath, prevPath}) {
  return (
    <>
    <form className="form-col-2">
        <h2 className="h2 col-2">Payment</h2>
        <div className="form-control">
            <label htmlFor="cardType">Card Type</label>
            <div className="input-group">
            <select name="cardType" id="cardType">
                <option value="">Credit card</option>
                <option value="">Debit card</option>
            </select>
            <span className="input-icon"><IoCardOutline/></span>
            </div>
        </div>
        <div className="form-control">
            <label htmlFor="carHolderName">Card Holder Name</label>
            <input type="text" name="carHolderName" id="carHolderName" placeholder="Card holder name"/>
        </div>
        <div className="form-control">
            <div className='input-half'>
            <label htmlFor="carHolderName">Ex. Date</label>
            <div className='input-group in-center'>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`2`} placeholder="MM"/
            ><span>/</span>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`2`} placeholder="YY"/>
            </div>
            </div>
            <div className='input-half'>
            <label htmlFor="carHolderName">CVV</label>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`3`} placeholder="CVV"/>
            </div>
        </div>
        <div className="form-control">
            <label htmlFor="carHolderName">Card Number</label>
            <div className='input-group in-center'>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`4`} placeholder="0000"/>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`4`} placeholder="0000"/>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`4`} placeholder="0000"/>
            <input type="text" name="carHolderName" id="carHolderName" maxLength={`4`} placeholder="0000"/>
            </div>
        </div>
        <input type="submit" onClick={(e) => { nextPath(e); }} value="Continue" className="btn-yellow form-btn"/>
        <input type="submit" onClick={(e) => { prevPath(e); }} value="Back" className="btn-yellow form-btn"/>
    </form>
    </>
  )
}
