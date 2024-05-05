import React, { useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Button, Input, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { contract } from "../../utils/web3Provider";
import { useSelector } from "react-redux";

export default function AddProduct() {
  // const navigate = useNavigate();

  const { metaMaskAddress } = useSelector((state: any) => state.auth);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");

  const [addingProduct, setAddingProduct] = useState(false);

  const addNewProductToBlockchain = async () => {
    setAddingProduct(true);
    try {
      const uuid = uuidv4();

      await contract.methods
        .createProduct(uuid, name, sku, image, new Date().toISOString())
        .send({
          from: metaMaskAddress,
        });

      setAddingProduct(false);
      toast.success("Product Added Successfully");
      setName("");
      setSku("");
      setImage("");
    } catch (error) {
      setAddingProduct(false);
      toast.error("Failed to add product");
    }
  };

  return (
    <DashboardLayout pageName="Add New Product">
      <Typography placeholder="" variant="h2" className="text-center">
        Add New Product
      </Typography>

      <form
        className="mt-5 p-2 flex flex-col gap-y-4 max-w-2xl mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          addNewProductToBlockchain();
        }}
      >
        <Input
          crossOrigin="AddProduct"
          size="lg"
          label="Product Name"
          type="text"
          className=""
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <Input
          crossOrigin="AddProduct"
          size="lg"
          label="SKU"
          type="text"
          value={sku}
          onChange={(e) => {
            setSku(e.target.value);
          }}
          required
        />
        <section className="flex items-center gap-x-3">
          <Input
            crossOrigin="AddProduct"
            size="lg"
            label="Image URL"
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            required
          />
        </section>
        <section className="flex items-center justify-center gap-x-4 pt-3">
          <Button
            placeholder=""
            size="lg"
            variant="gradient"
            color="blue-gray"
            type="reset"
            disabled={addingProduct}
          >
            Cancel
          </Button>
          <Button
            placeholder=""
            color="cyan"
            size="lg"
            variant="gradient"
            type="submit"
            disabled={addingProduct}
          >
            {addingProduct ? "Adding Product..." : "Add Product"}
          </Button>
        </section>
      </form>
    </DashboardLayout>
  );
}
