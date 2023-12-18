import React, { useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Button, Input, Typography } from "@material-tailwind/react";
import { AddNewProduct } from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type props = {
  user: {
    authProvider: string;
    email: string;
    fullName: string;
    profilePic: string;
    uid: string;
  };
};

export default function AddProduct({ user }: props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");

  const [addingProduct, setAddingProduct] = useState(false);

  const addNewProductToDB = async () => {
    setAddingProduct(true);
    const uuid = uuidv4();

    const res = await AddNewProduct({
      id: uuid,
      name: name,
      sku: sku,
      image: image,
      createdAt: new Date().toISOString(),
      status: "New",
      activity: [
        {
          name: `Product Listed by ${user.fullName}`,
          date: new Date().toISOString(),
          description: "",
          isPublic: true,
        },
      ],
    });
    setAddingProduct(false);
    if (res.result === "success") {
      toast.success(res.message);
      navigate(`/dashboard/product/${uuid}`);
    } else {
      toast.error(res.message);
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
          addNewProductToDB();
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

          {/* <Button placeholder="" size="md" className="w-44" variant="gradient">
            Upload New
          </Button> */}
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
            Add Product
          </Button>
        </section>
      </form>
    </DashboardLayout>
  );
}
