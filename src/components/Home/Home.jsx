import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";

import toast, { Toaster } from 'react-hot-toast';

import Header from "../Header/Header";
import AddProduct from "../AddProduct/AddProduct";
import { getProducts, deleteProduct } from "../../apis/product";
import { Search, StepForward } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import LoadingSpin from "react-loading-spin";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";


const Home = () => {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");

  const getAllProducts = async () => {
    const response = await getProducts(title);
    setProducts(response?.products);
  };

  const [editFormData, setEditFormData] = useState({
    id: "",
    productName: "",
    basePrice: "",
    sellingPrice: "",
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className={styles.home}>
       <Toaster
  position="top-right"
  reverseOrder={false}
/>

      <Header
        setIsAddProduct={setIsAddProduct}
        setEditFormData={setEditFormData}
        editFormData={editFormData}
      />
      {isAddProduct ? (
        <div className={styles.addproduct}>
          <AddProduct
            setIsAddProduct={setIsAddProduct}
            getAllProducts={getAllProducts}
            editFormData={editFormData}
          />
        </div>
      ) : (
        <></>
      )}

      <div className={styles.home__body}>
        <div className={styles.home__body_header}>
          <span>Products :</span>
          <div className={styles.home__body_searcharea}>
            <input
              type="text"
              placeholder="Search Product"
              onChange={(event) => {
                  getAllProducts();

                setTitle(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") getAllProducts();
              }}
              className={styles.home__input}
            />
            <button
              className={styles.home__body_searchbtn}
              onClick={() => {
                getAllProducts();
              }}
            >
              <Search />
            </button>
          </div>
        </div>
        <div className={styles.home__product_container}>
          <div className={styles.home__product_information}>
            <span>Product Name{" (In Rs.)"}</span>
            <span>Base Price{" (In Rs.)"}</span>
            <span>Selling Price{" (In Rs.)"}</span>
          </div>

          {products?.length > 0 ? (
            products.map((item) => (
              <>
                <div className={styles.home__product} key={item._id}>
                  <span>{item.productName}</span>
                  <span>Rs. {item.basePrice}</span>
                  <span className={styles.home__product_selling}>
                    Rs. {item.sellingPrice}{" "}
                    <span className={styles.home__delete_product}>
                      {" "}
                      <Pencil
                        onClick={() => {
                          setIsAddProduct(true);
                          setEditFormData({
                            ...editFormData,
                            id: item._id,
                            productName: item.productName,
                            basePrice: item.basePrice,
                            sellingPrice: item.sellingPrice,
                          });
                        }}
                      />
                      &nbsp;{" "}
                      <Trash2
                        onClick={async () => {
                          const response = await deleteProduct(item._id);
                          if (response?.status === 200) {
                            toast.success('Product Deleted!', {
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
                            getAllProducts();
                          }
                        }}
                      />
                    </span>
                  </span>
                </div>
                <hr />
              </>
            ))
          ) : (
           <ProductSkeleton/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
