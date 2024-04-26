import React from 'react'
import axios from 'axios';
const BACKENDURI = import.meta.env.VITE_BACKEND_URI;
export const checkLogin = async({email, password}) => {
 try {

   const reqUrl = `${BACKENDURI}/admin/login`
   
   const response = await axios.post(reqUrl,{ email, password })
    const token = response.data.token
     localStorage.setItem("token",token)
   return response.data
 } catch (error) {
      console.log(error)
 }
}
