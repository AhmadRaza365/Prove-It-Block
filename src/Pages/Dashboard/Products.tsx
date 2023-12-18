import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Input, Option, Select, Typography } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { FormateDate } from "../../utils/FormatDate";
import { GetProductsByUserId } from "../../utils/firebase";
import toast from "react-hot-toast";

type props = {
  user: {
    authProvider: string
    email: string;
    fullName: string;
    profilePic: string;
    uid: string;
  }
}

export default function Products({ user }: props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<any>(null);
  const [products, setProducts] = useState<any>([
    {
      id: "123",
      sku: "sku-123",
      name: "ABC",
      createdAt: "12-12-2023",
      status: "New",
    },
    {
      id: "123",
      sku: "sku-123",
      name: "ABC",
      createdAt: "12-12-2023",
      status: "New",
    },
    {
      id: "123",
      sku: "sku-123",
      name: "ABC",
      createdAt: "12-12-2023",
      status: "New",
    },
    {
      id: "123",
      sku: "sku-123",
      name: "ABC",
      createdAt: "12-12-2023",
      status: "New",
    },
  ]);

  const getUserProducts = async () => {
    setLoading(true);
    const res = await GetProductsByUserId(user.uid);
    
    setLoading(false);
    if (res.result === "success") {
      setProducts(res.products);
    } else {
      toast.error(res.message);
    }
  }

  const productsColumns = [
    {
      name: "Product Id",
      cell: (row: any) => (
        <p
          className="flex items-center gap-x-1.5 font-[600] text-smoky-black font-gtAmericaLight"
          onClick={() => navigate(`/order/${row?.orderShortCode}`)}
        >
          {row?.id}
        </p>
      ),
      minWidth: "100px",
    },
    {
      name: (
        <span className="border-l pl-2 border-[#D1D1D1]">Product Name</span>
      ),
      cell: (row: any) => (
        <span className="pl-2.5 font-[600] text-smoky-black font-gtAmericaLight">
          {row?.name}
        </span>
      ),
      minWidth: "126px",
      grow: 2,
    },
    {
      name: <span className="border-l pl-2 border-[#D1D1D1]">SKU</span>,
      cell: (row: any) => (
        <span className="pl-2.5 font-[600] text-smoky-black font-gtAmericaLight">
          {row.sku}
        </span>
      ),
      minWidth: "126px",
    },
    {
      name: <span className="border-l pl-2 border-[#D1D1D1]">Date</span>,
      cell: (row: any) => (
        <span className="pl-2.5 font-[600] text-smoky-black font-gtAmericaLight">
          {FormateDate(row.createdAt, "MMM DD, YYYY")}
        </span>
      ),
      minWidth: "126px",
    },
    {
      name: <span className="border-l pl-2 border-[#D1D1D1]">Status</span>,
      cell: (row: any) => (
        <span className="pl-2.5 font-[600] text-smoky-black font-gtAmericaLight">
          {row.status}
        </span>
      ),
      minWidth: "126px",
    },
  ];

  const customStyles = {
    table: {
      style: {
        overflow: "scroll",
      },
    },
    rows: {
      style: {
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #ddd !important",
      },
    },
    headRow: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
        borderBottom: "1px solid #ddd !important",
      },
    },
    cells: {
      style: {
        border: "none",
        fontSize: "13px",
        color: "#605F5F",
      },
    },
  };

  useEffect(() => {
    getUserProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <DashboardLayout pageName="Products">
      <Typography placeholder="" variant="h2">
        Products
      </Typography>

      <section className="flex items-center gap-x-5 mt-5">
        <section className="w-full max-w-sm">
          <Input
            crossOrigin="products"
            label="Search"
            type="text"
            size="lg"
            className=""
            icon={<IoSearch size={20} />}
          />
        </section>
        <div className="w-52">
          <Select placeholder="" label="Filter By" size="lg" variant="outlined">
            <Option value="1">All</Option>
            <Option value="1">New</Option>
            <Option value="2">Sold out</Option>
          </Select>
        </div>
        <div className="w-52">
          <Select placeholder="" label="Sort By" size="lg" variant="outlined">
            <Option value="1">Default</Option>
            <Option value="1">Newest First</Option>
            <Option value="2">Old First</Option>
          </Select>
        </div>
      </section>

      <section className="mt-5 w-full">
        <DataTable
          columns={productsColumns}
          data={products}
          customStyles={customStyles}
          progressPending={loading}
          progressComponent={
            <div className="flex justify-center items-center gap-3 p-4 h-[50vh]">
              <p className="text-[20px] text-secondary-blue animate-spin">
                <AiOutlineLoading3Quarters />
              </p>
              <p className="text-[18px] text-dark-gray ml-1">
                Fetching products...
              </p>
            </div>
          }
          noDataComponent={
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="p-2 font-bold text-2xl text-center">
                No Products to display at this time!
              </p>
            </div>
          }
          highlightOnHover
          pointerOnHover
          onRowClicked={(row: any) => navigate(`/dashboard/product/${row?.id}`)}
          pagination
        />
      </section>
    </DashboardLayout>
  );
}
