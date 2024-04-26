import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({setIsAddProduct, setEditFormData, editFormData}) => {
    const navigate = useNavigate()
  return (

    <div className={styles.home__header}>
    <img
      src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=1380&t=st=1710574664~exp=1710575264~hmac=be6529fbaaf32a6b879cc59314d53e1ea8485a4f7b16d48c3538db29eec60d8d"
      height="100px"
      width="100px"
      style={{
        borderRadius: "50%",
      }}
      alt="error"
    />
    <h3 className={styles.home__header_title}>BillZy Solutions</h3>
    <div className={styles.home__navigation}>
      <button className={styles.home__header_btn} onClick={()=>{
        navigate('/billing')
      }}>Create Bill</button>
      <button className={styles.home__header_btn}onClick={()=>{
        setIsAddProduct(true)
        setEditFormData({
          ...editFormData,
          id: "",
          productName: "",
          basePrice: "",
          sellingPrice: "",
        })
      }}>Add Prod.</button>
      <button className={styles.home__header_btn} onClick={()=>{navigate('/dashboard')}}>All Bills</button>
      <button className={styles.home__header_btn} onClick={()=>{
        localStorage.clear()
        navigate('/login')
      }}>Logout</button>
    </div>
  </div>
    )
}

export default Header