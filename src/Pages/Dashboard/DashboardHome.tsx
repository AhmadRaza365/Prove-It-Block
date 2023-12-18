import React, { useEffect } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

type props = {
  user: {
    authProvider: string
    email: string;
    fullName: string;
    profilePic: string;
    uid: string;
  }
}

function DashboardHome({ user }: props) {
  const navigate = useNavigate();

  return (
    <DashboardLayout pageName="Dashboard">
      <section className="mx-auto flex flex-wrap justify-center items-center gap-6 max-w-[50rem] pt-16">
        <Button
          placeholder=""
          className="w-96 h-52 text-2xl font-normal capitalize text-black bg-gradient from-secondary to-secondary/50"
          color="cyan"
          variant="gradient"
          onClick={() => {
            navigate("/dashboard/products");
          }}
        >
          View Products
        </Button>
        <Button
          placeholder=""
          className="w-96 h-52 text-2xl font-normal capitalize text-black bg-gradient from-secondary to-secondary/50"
          color="cyan"
          variant="gradient"
          onClick={() => {
            navigate("/dashboard/products/add");
          }}
        >
          Add New Product
        </Button>
        <Button
          placeholder=""
          className="w-96 h-52 text-2xl font-normal capitalize text-black bg-gradient from-secondary to-secondary/50"
          color="cyan"
          variant="gradient"
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          Settings
        </Button>
      </section>
    </DashboardLayout>
  );
}

export default DashboardHome;
