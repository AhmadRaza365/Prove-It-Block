import { ListItem } from "@material-tailwind/react";
import React from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdAddBox, MdDashboard } from "react-icons/md";
import { IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Props = {
  activePage: string;
};

export default function SideBar({ activePage }: Props) {
  const navigate = useNavigate();

  const pages = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: "Products",
      link: "/dashboard/products",
      icon: <BsBoxSeamFill size={22} />,
    },
    {
      name: "Add New Product",
      link: "/dashboard/products/add",
      icon: <MdAddBox size={22} />,
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icon: <IoSettingsSharp size={22} />,
    },
  ];

  return (
    <section className="z-[9] fixed top-0 w-72 h-screen pt-28 bg-white shadow-2xl px-5">
      {pages.map((page, index) => {
        return (
          <ListItem
            placeholder=""
            key={index}
            selected={page.name === activePage}
            className={`py-4 mt-2 first:mt-0 text-black flex items-center gap-x-2 ${page.name === activePage
              ? "mb-3 border border-black bg-secondary hover:bg-secondary active:bg-secondary focus:bg-secondary shadow-[3px_3px_0_black]"
              : "mb-2"
              }`}
            onClick={() => {
              navigate(page.link)
            }}
          >
            {page.icon}
            {page.name}
          </ListItem>
        );
      })}

      <ListItem
        placeholder=""
        className={`py-4 mt-2 text-black flex items-center gap-x-2 mb-2`}
      >
        <IoLogOut size={22} className="rotate-180" />
        Logout
      </ListItem>
    </section>
  );
}
