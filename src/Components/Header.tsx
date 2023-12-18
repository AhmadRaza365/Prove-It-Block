import { Button } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  isDashboard?: boolean;
};

function Header({ isDashboard = false }: Props) {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-20 bg-black text-white py-3.5 flex items-center justify-between shadow-lg ${
        isDashboard ? "px-20" : "px-20 2xl:px-32"
      }`}
    >
      <Link to="/" className="text-3xl font-bold italic text-white">
        ProveItBlock
      </Link>

      <section className="flex items-center gap-x-7">
        <Link to="/verify" className="text-xl font-normal text-white">
          Verify Product
        </Link>
        <Button
          placeholder="Login"
          variant="filled"
          className="bg-secondary text-black"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </section>
    </header>
  );
}

export default Header;
