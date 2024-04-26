import React,{useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const ProtectedRoute = (props) => {
    const navigate = useNavigate()
   const {Component} = props
   const [token] = useState(localStorage.getItem("token"))

  return (
     <div>{token ? <Component/>: <Navigate to='/login'/>}</div>
  )
}

export default ProtectedRoute