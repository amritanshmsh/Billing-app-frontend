import React from 'react'
import styles from './ProductSkeleton.module.css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ProductSkeleton = () => {
 const totalSkeleton = Array(5).fill(0)
  return (

    <>
    {totalSkeleton.map(()=>(
    <> 
    <div className={styles.home__product}>
      <span><Skeleton/></span>
      <span><Skeleton/></span>
      <span className={styles.home__product_selling}>
    <Skeleton />
      </span>
    </div>
    <hr />
    </>
    ))}
  </>
  )
}

export default ProductSkeleton