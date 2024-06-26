import { Button } from "@material-tailwind/react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/AuthSlice";

type Props = {
  isDashboard?: boolean;
};

function Header({ isDashboard = false }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { metaMaskAddress } = useSelector((state: any) => state.auth);
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        dispatch(
          login({
            metaMaskAddress: accounts[0] ?? null,
          })
        );

        toast.success("Wallet connected successfully!");
      } catch (err: any) {
        toast.error(err?.message ?? "Something went wrong. Try again later!");
      }
    } else {
      /* MetaMask is not installed */
      toast.error("Please install MetaMask");
    }
  };

  return (
    <header
      className={`sticky top-0 z-20 bg-black text-white py-3.5 flex items-center justify-between shadow-lg ${isDashboard ? "px-20" : "px-20 2xl:px-32"
        }`}
    >
      <Link to="/" className="text-3xl font-bold italic text-white">
        ProveItBlock
      </Link>

      <section className="flex items-center gap-x-7">
        <Link to="/verify" className="text-xl font-normal text-white">
          Verify Product
        </Link>
        {!isDashboard && (
          <>
            {metaMaskAddress ? (
              <Button
                placeholder="Dashboard"
                variant="filled"
                className="bg-secondary text-black"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                placeholder="Login"
                variant="filled"
                className="bg-secondary text-black"
                onClick={() => {
                  connectWallet();
                }}
              >
                Login
              </Button>
            )}
          </>
        )}
      </section>
    </header>
  );
}

export default Header;
