import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

import AddProduct from "./components/AddProduct/AddProduct";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import BillPage from "./pages/BillPage/BillPage";
import AllBills from "./components/AllBills/AllBills";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  return (
    <SkeletonTheme duration={1} baseColor="#22384c" highlightColor="#fff">
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={HomePage}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/billing" element={<ProtectedRoute Component={BillPage}/>}/>
      <Route path="/dashboard" element={<ProtectedRoute Component={AllBills}/>}/>
    </Routes>
    </SkeletonTheme>
  );
}

export default App;
