import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import ResetPassword from "./Pages/ResetPassword";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import Products from "./Pages/Dashboard/Products";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ProductDetails from "./Pages/Dashboard/ProductDetails";
import Verify from "./Pages/Verify";
import VerificationStatus from "./Pages/VerificationStatus";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slices/AuthSlice";
import BrandProfile from "./Pages/Dashboard/BrandProfile";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const { metaMaskAddress } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          dispatch(
            login({
              metaMaskAddress: accounts[0] ?? null,
            })
          );
        }
      } catch (err: any) {
        toast.error(err.message ?? "Something went wrong. Try again later!");
      }
    } else {
      /* MetaMask is not installed */
      toast.error("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any) => {
        dispatch(
          login({
            metaMaskAddress: accounts[0] ?? null,
          })
        );
      });
    } else {
      /* MetaMask is not installed */
      toast.error("Please install MetaMask");
    }
  };

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:id" element={<VerificationStatus />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* Auth Routes */}
        <Route
          path="/dashboard"
          element={metaMaskAddress ? <DashboardHome /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/products"
          element={metaMaskAddress ? <Products /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/products/add"
          element={metaMaskAddress ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/product/:id"
          element={metaMaskAddress ? <ProductDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/brand-profile"
          element={metaMaskAddress ? <BrandProfile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
