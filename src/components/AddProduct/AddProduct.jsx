import React, { useState, useRef } from "react";
import styles from "./AddProduct.module.css";

import { addProduct } from "../../apis/product";
import { editProduct } from "../../apis/product";
import { Toaster, toast } from "react-hot-toast";

const AddProduct = ({ setIsAddProduct, getAllProducts, editFormData }) => {
  const productValue = useRef(null);
  const baseValue = useRef(null);
  const sellingValue = useRef(null);
  const [basePriceData] = useState(editFormData.basePrice.replace(/,/g, ""));
  const [sellingPriceData] = useState(
    editFormData.sellingPrice.replace(/,/g, "")
  );
  const [formData, setFormData] = useState({
    id: "" || editFormData.id,
    productName: "" || editFormData.productName,
    // basePrice: "" || editFormData.basePrice,
    basePrice: "" || basePriceData,
    // sellingPrice: "" || editFormData.sellingPrice,
    sellingPrice: "" || sellingPriceData,
  });
  const [error, setError] = useState({
    productName: "",
    basePrice: "",
    sellingPrice: "",
  });
  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const addNewProduct = async () => {
    const response = await addProduct({ ...formData });
    return response;
  };

  const editProductData = async () => {
    const response = await editProduct({ ...formData });
    return response;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({
      productName: "",
      basePrice: "",
      sellingPrice: "",
    });
    let isValid = true;
    if (!formData.productName.trim().length) {
      setError((prev) => {
        return {
          ...prev,
          productName: "Product Name Field is Required !",
        };
      });
      isValid = false;
    }

    if (!formData.basePrice.trim().length) {
      setError((prev) => {
        return {
          ...prev,
          basePrice: "Base Price is Required!",
        };
      });
      isValid = false;
    } else if (!/^[0-9]+$/.test(formData.basePrice)) {
      setError((prev) => {
        return {
          ...prev,
          basePrice: "Base Price Should be a Number!",
        };
      });
      isValid = false;
    }
    if (!formData.sellingPrice.trim().length) {
      setError((prev) => {
        return {
          ...prev,
          sellingPrice: "Selling price is Required!",
        };
      });
      isValid = false;
    } else if (!/^[0-9]+$/.test(formData.sellingPrice)) {
      setError((prev) => {
        return {
          ...prev,
          sellingPrice: "Selling Price Should be a Number!",
        };
      });
      isValid = false;
    }

    if (isValid) {
      if (!editFormData.id) {
        const response = await addNewProduct();
        if (response?.status === 201) {
          productValue.current.value = "";
          baseValue.current.value = "";
          sellingValue.current.value = "";
          setFormData({
            ...formData,
            productName: "",
            basePrice: "",
            sellingPrice: "",
          });
          const allProductResponse = await getAllProducts();
          toast.success("Product Saved Successfully!", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        }
      } else {
        const response = await editProductData();
        if (response?.status === 200) {
          productValue.current.value = "";
          baseValue.current.value = "";
          sellingValue.current.value = "";
          setFormData({
            ...formData,
            id: "",
            productName: "",
            basePrice: "",
            sellingPrice: "",
          });
          const allProductResponse = await getAllProducts();
          alert("Edited Successfully!");
        }

        setIsAddProduct(false);
      }
    }
  };

  return (
    <div className={styles.product}>
      <Toaster position="top-right" reverseOrder={false} />
      <h3 className={styles.home__header_title}>Billzy Solutions</h3>

      <div className={styles.product__container}>
        <label>
          <span>Product Name: </span>
        </label>
        <input
          type="text"
          placeholder="Item Name"
          name="productName"
          onChange={(event) => {
            onChangeHandler(event);
          }}
          ref={productValue}
          style={{
            border: `${
              error.productName ? "2px solid red" : "2px solid #C2C2C2"
            }`,
          }}
          value={formData.productName}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
      </div>
      {error.productName && (
        <span className={styles.error__text}>{error.productName}</span>
      )}
      <div className={styles.product__container}>
        <label>
          <span>Base Price: </span>
        </label>
        <input
          type="text"
          placeholder="Base Price"
          name="basePrice"
          ref={baseValue}
          onChange={(event) => {
            onChangeHandler(event);
          }}
          style={{
            border: `${
              error.basePrice ? "2px solid red" : "2px solid #C2C2C2"
            }`,
          }}
          value={formData.basePrice}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
      </div>
      {error.basePrice && (
        <span className={styles.error__text}>{error.basePrice}</span>
      )}
      <div className={styles.product__container}>
        <label>
          <span>Selling Price: </span>
        </label>
        <input
          type="text"
          placeholder="Selling Price"
          name="sellingPrice"
          ref={sellingValue}
          onChange={(event) => {
            onChangeHandler(event);
          }}
          style={{
            border: `${
              error.sellingPrice ? "2px solid red" : "2px solid #C2C2C2"
            }`,
          }}
          value={formData.sellingPrice}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
      </div>
      {error.sellingPrice && (
        <span className={styles.error__text}>{error.sellingPrice}</span>
      )}

      <div className={styles.product__btn_container}>
        <button
          className={styles.product__btn}
          onClick={() => {
            setIsAddProduct(false);
          }}
        >
          Cancel
        </button>
        <button
          className={styles.product__btn}
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          {editFormData.id ? "Edit Prod." : "Add Prod."}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
