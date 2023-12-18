import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import Products from "./Pages/Dashboard/Products";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ProductDetails from "./Pages/Dashboard/ProductDetails";
import Verify from "./Pages/Verify";
import VerificationStatus from "./Pages/VerificationStatus";
import { onAuthStateChanged } from "firebase/auth";
import { GetUserData, auth } from "./utils/firebase";

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        GetUserData(user.uid)
          .then((res) => {
            setUser(res.userData);
          })
          .catch((error) => {
            setUser(null);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:id" element={<VerificationStatus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Auth Routes */}
        <Route path="/dashboard" element={user ? <DashboardHome user={user} /> : <Navigate to="/login" />} />
        <Route path="/dashboard/products" element={user ? <Products user={user} /> : <Navigate to="/login" />} />
        <Route path="/dashboard/products/add" element={user ? <AddProduct user={user} /> : <Navigate to="/login" />} />
        <Route path="/dashboard/product/:id" element={user ? <ProductDetails user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
