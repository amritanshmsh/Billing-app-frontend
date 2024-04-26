import React, { useEffect, useState } from "react";

import styles from "./AllBills.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Search, StepForward } from "lucide-react";
import ProfileIcon from "/assets/icons/profile.png";
import { getBills } from "../../apis/bills";
import { deleteBill } from "../../apis/bills";

import LoadingSpin from "react-loading-spin";
import { Trash2 } from "lucide-react";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const AllBills = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState()
  const [bills,setBills] = useState([])

  const getAllBills = async() => {
    const response = await getBills(title)
    setBills(response.bills)
  }


  useEffect(()=>{
      getAllBills()
  },[])

  return (
    <div className={styles.home}>
      <div className={styles.home__header}>
        <Toaster position="top-right" reverseOrder={false} />
        <img
          src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=1380&t=st=1710574664~exp=1710575264~hmac=be6529fbaaf32a6b879cc59314d53e1ea8485a4f7b16d48c3538db29eec60d8d"
          height="100px"
          width="100px"
          style={{
            borderRadius: "50%",
          }}
          alt="error"
          onClick={() => {
            navigate("/");
          }}
          className={styles.home__header_img}
        />
        <h3 className={styles.home__header_title}>BillZy Solutions</h3>
        <div className={styles.home__navigation}>
          <button
            className={styles.home__header_btn}
            onClick={() => {
              navigate("/billing");
            }}
          >
            Create Bill
          </button>
          <button
            className={styles.home__header_btn}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </div>
      </div>

      <div className={styles.home__body}>
        <div className={styles.home__body_header}>
          <span>All Bills :</span>
          <div className={styles.home__body_searcharea}>
            <input
              type="text"
              placeholder="Search Product"
              onChange={(event) => {

                  getAllBills()

                setTitle(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") getAllBills();
              }}
              className={styles.home__input}
            />
            <button
              className={styles.home__body_searchbtn}
              onClick={() => {
                getAllBills();
              }}
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.home__product_container}>

     {
     
bills?.length > 0 ? (     bills?.map((item)=>(

        <div className={styles.home__profile_card}>
          <div className={styles.home__card__data}>
            <img
              src={ProfileIcon}
              alt="error"
              className={styles.home__card_profile_img}
            />

            <div className={styles.home__card_name}>
              <span>Name: {item.clientName}</span>
              <span>Mobile No: {item.contactNo}</span>
              <span>Total Amount: &#8377;{item.totalAmount}</span>
              <span>Payment Method: <span style={{
                textTransform: "uppercase"
              }}>{item.paymentMethod}</span></span>
            </div>
          </div>

          <div className={styles.home__cards_products}>
            <h2 className={styles.home__cards__heading}>Products:</h2>

            <div className={styles.home__card__product_cont}>

           {item?.products?.map((products)=>(
            <>
              <span>
                <b>{products?.productName}</b> <b>{products?.quantity} X &#8377;&nbsp;{products?.sellingPrice}</b>
              </span>
               <hr />
               </>
        ))}
             
        <div className={styles.home__trash_bin} onClick={async()=>{
           const response =  await deleteBill(item._id)
         if(response?.status===200) {
            toast.success('Bill Deleted!', {
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });    
             getAllBills()
         }
        }}><Trash2/></div>
            </div>
          </div>
        </div>
  
  ))) :(<div className={styles.home__no_product_found}> <LoadingSpin
    duration="2s"
    width="4px"
    timingFunction="ease-in-out"
    direction="alternate"
    size="55px"
    primaryColor="#000000"
    secondaryColor="#fafafa"
    numberOfRotationsInAnimation={2}
  />
  No Bills Available!</div>)    }
   



      </div>
    </div>
  );
};

export default AllBills;
