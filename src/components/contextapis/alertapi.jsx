import React, { createContext, useState } from 'react'

export const AlertApiContext = createContext()

export default function AlertApiProvider({children}) {

    
  const [alert, setAlert] = useState([])

  const handleAlert = (newAlert) => {

    const check = alert.some(val => {
      return val.msg === newAlert.msg
    })
    if(!check){
      setAlert((prevAlert) => [...prevAlert, {...newAlert, visible: false}])
    }else{
      setAlert((prevAlert) => 
        prevAlert.map((alert, i) => {
          return alert.msg === newAlert.msg  ? { ...alert, visible: false } : alert}
        )
      );
    }

    setTimeout(() => {
      setAlert((prevAlert) => 
        prevAlert.map((alert, i) => {
          return i === prevAlert.length - 1 ? { ...alert, visible: true } : alert}
        )
      );
    }, 200);
  }
  const closeAlert = (id) => {

    const hideAlert = alert.map((alert, i) => {
      return i === id ? {...alert, visible: false} : alert
    })
    setAlert(hideAlert)

    setTimeout(() => {
      setAlert(alert.filter((val, i) => {
        return i !== id
      }))
    }, 200)
    
  }

  return (
    <AlertApiContext.Provider value={{alert, handleAlert, closeAlert}}>
        {children}
    </AlertApiContext.Provider>
  )
}
