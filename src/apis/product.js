import React from 'react'
import axios from 'axios';

const BACKENDURI = import.meta.env.VITE_BACKEND_URI;
export const getProducts = async(title) => {
  try {
    const reqUrl = `${BACKENDURI}/product/get-products`
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(reqUrl,{ title })
    return response.data

  } catch (error) {
      console.log(error)
  }
}

export const deleteProduct = async (id) => {
    try {
        const reqUrl = `${BACKENDURI}/product/delete-product/${id}`
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.delete(reqUrl)
       return response
      } catch (error) {
          console.log(error)
      }
}

export const addProduct = async({productName, basePrice, sellingPrice}) => {
    try {
      const reqUrl = `${BACKENDURI}/product/add-product`
      const token = localStorage.getItem("token")
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(reqUrl,{ productName, basePrice, sellingPrice })
      return response
  
    } catch (error) {
        console.log(error)
    }
  }
export const editProduct = async({id,productName, basePrice, sellingPrice}) => {

    try {
      const reqUrl = `${BACKENDURI}/product/edit-product/${id}`
      const token = localStorage.getItem("token")
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.patch(reqUrl,{ productName, basePrice, sellingPrice })
      return response
  
    } catch (error) {
        console.log(error)
    }
  }
