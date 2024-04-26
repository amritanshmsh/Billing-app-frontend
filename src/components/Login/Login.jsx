import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { checkLogin } from "../../apis/auth";
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpin from "react-loading-spin";



const Login = () => {
  const navigate = useNavigate();
  const [isLogin,setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };

  const authLogin = async () => {
    const response = await checkLogin({...formData});
    return response
  };
  const handleSubmit = async(event) => {
     event.preventDefault()
     setError({
        email: "",
        password: "",
      })

      let isValid = true;

      if (!formData.email.trim().length) {
        setError((prev) => {
          return {
            ...prev,
            email: "Email Field is Required!",
          };
        });
        isValid = false
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError((prev) => {
          return {
            ...prev,
            email: "Email is not Valid!",
          };
        });
        isValid = false
      }
      if (!formData.password.trim().length) {
        setError((prev) => {
          return {
            ...prev,
            password: "Password Field is Required!",
          };
        });
        isValid = false
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
        setError((prev) => {
          return {
            ...prev,
            password: "Password is not Valid!",
          };
        });
        isValid = false
      }   
    if(isValid) {
setIsLogin(false)
      const response =  await authLogin()
      if(response?.token) {
        navigate('/')
      } else {
toast.error('Check Password/Username.', {
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
      }
    }
  }

  useEffect(()=>{
 localStorage.clear()
  },[])
  return (
    <div className={styles.login}>
  
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
<DummyUser/>
      <div className={styles.login__container}>
        <h3 className={styles.login__heading}>BillZy Billing Solutions</h3>
        <p>Your Personal Billing Software</p>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(event) => {
            onChangeHandler(event);
          }}
          style={{
            border: `${error.email ? "2px solid red": "2px solid #C2C2C2"}`
          }}
        />
        <span className={styles.login__error}>{error.email}</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            onChangeHandler(event);
          }}
          style={{
            border: `${error.password ? "2px solid red": "2px solid #C2C2C2"}`
          }}
        />
         <span className={styles.login__error}>{error.password}</span>
        <button
          className={styles.login__submitbtn}
          onClick={(event)=>{handleSubmit(event)}}
        >
          { isLogin ? 
            "Login" : 
  
          <LoadingSpin
    duration="2s"
    width="4px"
    timingFunction="ease-in-out"
    direction="alternate"
    size="30px"
    primaryColor="#000000"
    secondaryColor="#fafafa"
    numberOfRotationsInAnimation={2}
  />
          }
        </button>
      </div>
    </div>
  );
};


const DummyUser = () => {


    return (
      <div className={styles.admin}>
            <h3>Guest User Login :</h3> 
 <div className={styles.admin__credentials}>
  <span><b>Email:</b> &nbsp;<span style={{
    fontWeight: "500"
  }}>guest@gmail.com </span></span>
  <span><b>Password:</b>&nbsp;<span style={{
    fontWeight: "500"
  }}>Guest@123</span></span>
  </div> 
       </div>
    )
}
export default Login;
