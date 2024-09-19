import React, { createContext, useEffect, useState } from 'react'

export const AuthUserContext = createContext()

export default function AuthUserProvider({children}) {
    
    let users = localStorage.getItem("users")
    users = users ? JSON.parse(users) : []
    const [user, setUser] = useState(users)

    useEffect(() => {
    localStorage.setItem("users", JSON.stringify(user))
    },[user])

    const loginObj = {
        id: "",
        email: "",
        username: "",
        status: false
    }
    
    let logedUser = localStorage.getItem("logedUser")
    logedUser = logedUser ? JSON.parse(logedUser) : loginObj

    const [login, setLogin] = useState(logedUser)

    useEffect(() => {
        localStorage.setItem("logedUser", JSON.stringify(login))
    },[login])

    const handleUserAuth = (formData) => {
        let alertMsg = {};
        if(formData.formType === "signup"){
        if(user.length) {
            const find = user.some((u) => {
                return u.email === formData.email;
             })
    
            if(find){
                alertMsg = { type: "red", msg: "Email already exist, if "+formData.email+" your contiune to login"}
            }else{
                setUser([...user, formData])
                alertMsg = { type: "green", msg: "Account created successfully. email: "+formData.email}
            }
        }else{
            setUser([...user, formData])
            alertMsg = { type: "green", msg: "Account created successfully. email: "+formData.email}
        }}

        if(formData.formType === "login"){
            if(user.length) {
                let find = user.filter((u, i) => {
                     return u.email === formData.email
                 })
                if(find.length){
                    if(find[0].pass === formData.pass){
                    setLogin({
                        id: "",
                        username: find[0].username,
                        email: find[0].email,
                        status: true
                    })
                    alertMsg = { type: "green", msg: "You are loged in successfully."}
                }else{
                    alertMsg = { type: "red", msg: "Password incorrect.."}
                }
                }else{
                    alertMsg = { type: "red", msg: "Account not found using this email."}
                }
            }else{
                alertMsg = { type: "red", msg: "Account not found using this email."}
            }
        }

        return alertMsg
    }

    
    const handleLogout = () => {
        if(login.status) {
            setLogin(loginObj)
        }
    }

  return (
    <AuthUserContext.Provider value={{login, handleUserAuth, handleLogout}}>
        {children}
    </AuthUserContext.Provider>
  )
}
