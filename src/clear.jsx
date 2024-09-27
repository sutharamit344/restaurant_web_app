import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Clear() {
    useEffect(() => {
    localStorage.clear()
    window.location.href = "/"
    },[])
}
