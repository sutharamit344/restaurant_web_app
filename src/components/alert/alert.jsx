import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function Alert({alert, closeAlert}) {

    return (
        alert.map((val, i) => {
            return (
            <div key={i} className={`alert ${val.visible ? "show": "hide"} alert-${val.type}`}>
            <span className='alert-msg'>
                {val.msg}
            </span>
            <span className='alert-close' onClick={() => closeAlert(i)}>
                <IoClose/>
            </span>
            </div>
            )
        })
    ).reverse()
}
