import React, { useEffect, useRef } from 'react'
import { IoCardOutline } from 'react-icons/io5';

export default function Payment({prevPath, formData, handleCard, handleComplexInput}) {
    const month = useRef(null)
    const year = useRef(null)
    const cvv = useRef(null)
    const n1 = useRef(null)
    const n2 = useRef(null)
    const n3 = useRef(null)
    const n4 = useRef(null)

    useEffect(() => {
        if(month.current.value.length >= 2 && month.current === document.activeElement){
            year.current.focus()
        }
        if(year.current.value.length >= 2 && year.current === document.activeElement){
            cvv.current.focus()
        }
        if(cvv.current.value.length >= 3 && cvv.current === document.activeElement){
            n1.current.focus()
        }
        if(n1.current.value.length >= 4 && n1.current === document.activeElement){
            n2.current.focus()
        }
        if(n2.current.value.length >= 4 && n2.current === document.activeElement){
            n3.current.focus()
        }
        if(n3.current.value.length >= 4 && n3.current === document.activeElement){
            n4.current.focus()
        }
        if(n4.current.value.length >= 4 && n4.current === document.activeElement){
            n4.current.blur()
        }
    },[formData.exMonth, formData.exYear, formData.cvv, formData.cardNum1, formData.cardNum2, formData.cardNum3, formData.cardNum4])

  return (
    <>
    <form className="form-col-2">
        <h2 className="h2 col-2">Payment</h2>
        <div className="form-control">
            <label htmlFor="cardType">Card Type</label>
            <div className="input-group">
            <select name="cardType" id="cardType" value={formData.cardType} onChange={handleComplexInput} >
                <option value="Credit Card">Credit card</option>
                <option value="Debit Card">Debit card</option>
            </select>
            <span className="input-icon"><IoCardOutline/></span>
            </div>
            {formData.submited && !formData.cardType && <div className="error-msg">Card Type required.</div>}
        </div>
        <div className="form-control">
            <label htmlFor="cardHolder">Card Holder Name</label>
            <input type="text" name="cardHolder" id="cardHolder" placeholder="Card holder name"
                value={formData.cardHolder} onChange={handleComplexInput} />
            {formData.submited && !formData.cardHolder && <div className="error-msg">Card holder name is required.</div>}
        </div>
        <div className="form-control-half">
            <div className='half-control'>
            <label htmlFor="exMonth">Ex. Date</label>
            <div className='input-group in-center'>
            <input type="number" ref={month} name="exMonth" id="exMonth" placeholder="MM" value={formData.exMonth} onChange={handleComplexInput} />
            <span>/</span>
            <input type="number" ref={year} name="exYear" id="exYear" placeholder="YY" value={formData.exYear} onChange={handleComplexInput} />
            </div>
            {formData.submited && (!formData.exMonth || !formData.exYear) && <div className="error-msg">is required.</div>}
            </div>
            <div className='half-control'>
            <label htmlFor="cvv">CVV</label>
            <input type="number" ref={cvv} name="cvv" id="cvv" maxLength={`3`} placeholder="CVV" value={formData.cvv} onChange={handleComplexInput} />
            {formData.submited && !formData.cvv && <div className="error-msg">is required.</div>}
            </div>
        </div>
        <div className="form-control">
            <label htmlFor="cardNum1">Card Number</label>
            <div className='input-group in-center'>
            <input type="number" ref={n1} name="cardNum1" id="cardNum1" placeholder="0000" value={formData.cardNum1} onChange={handleComplexInput} />
            <input type="number" ref={n2} name="cardNum2" id="cardNum2" placeholder="0000" value={formData.cardNum2} onChange={handleComplexInput} />
            <input type="number" ref={n3} name="cardNum3" id="cardNum3" placeholder="0000" value={formData.cardNum3} onChange={handleComplexInput} />
            <input type="number" ref={n4} name="cardNum4" id="cardNum4" placeholder="0000" value={formData.cardNum4} onChange={handleComplexInput} />
            </div>
            {formData.submited && (!formData.cardNum1 || !formData.cardNum2 || !formData.cardNum3 || !formData.cardNum4) && <div className="error-msg">is required.</div>}
        </div>
        <input type="submit" onClick={(e) => { handleCard(e) }} value="Continue" className="btn-yellow form-btn"/>
        <input type="submit" onClick={(e) => { prevPath(e); }} value="Back" className="btn-yellow form-btn"/>
    </form>
    </>
  )
}
