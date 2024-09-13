import React from 'react'
import { IoIosCard } from "react-icons/io";

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
            <span className="input-icon"><IoIosCard/></span>
            </div>
        </div>
        <div className="form-control">
            <label htmlFor="carHolderName">Card Holder Name</label>
            <input type="text" name="carHolderName" id="carHolderName" placeholder="Card holder name"/>
        </div>
        <div className="form-control">
        <div>
            <label htmlFor="validate">Ex. Date</label>
            <div className="input-group">
                <input type="text" name="validate" id="validate" placeholder="mm" maxLength="2"/>/
                <input type="text" name="validate"placeholder="yy" maxLength="2"/>
            </div>
        </div>
        <div>
            <label htmlFor="cvv">CVV</label>
            <input type="numemailber" name="cvv" id="cvv" placeholder="CVV"/>
        </div>
        </div>
        <div className="form-control">
            <label htmlFor="cardNumber">Card Number</label>
            <div className="input-group">
                <input type="text" name="cardNumber1" id="cardNumber" placeholder="0000" maxLength="4"/>
                <input type="text" name="cardNumber2" placeholder="0000" maxLength="4" />
                <input type="text" name="cardNumber3" placeholder="0000" maxLength="4" />
                <input type="text" name="cardNumber4" placeholder="0000" maxLength="4" />
            </div>
        </div><input type="submit" onClick={(e) => { nextPath(e); }} value="Continue" className="btn-yellow form-btn"/>
        <input type="submit" onClick={(e) => { prevPath(e); }} value="Back" className="btn-yellow form-btn"/>
    </form>
    </>
  )
}
