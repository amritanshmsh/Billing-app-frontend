import React from 'react'
import axios from 'axios';

const BACKENDURI = import.meta.env.VITE_BACKEND_URI;
export const getBills = async(title) => {
  try {
    const reqUrl = `${BACKENDURI}/bill/all-bills`
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(reqUrl,{title})
    return response.data
  } catch (error) {
      console.log(error)
  }
}
export const createBill = async(clientName, contactNo, totalAmount, products, paymentMethod) => {
  try {
    const reqUrl = `${BACKENDURI}/bill/create-bill`
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(reqUrl,{clientName, contactNo, totalAmount, products, paymentMethod})
    return response
  } catch (error) {
      console.log(error)
  }
}

export const deleteBill = async(id) => {
  try {
    const reqUrl = `${BACKENDURI}/bill/delete/${id}`
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(reqUrl)
    return response
  } catch (error) {
      console.log(error)
  }
}