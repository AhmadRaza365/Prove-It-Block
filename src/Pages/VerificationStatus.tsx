import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Spinner, Typography } from "@material-tailwind/react";
import { FormateDate } from "../utils/FormatDate";
import { useNavigate, useParams } from "react-router-dom";
import { GetBrandProfileById } from "../utils/firebase";
import toast from "react-hot-toast";
import { contract } from "../utils/web3Provider";
import ImagePlaceholder from "../Images/image-placeholder.avif";

export default function VerificationStatus() {
  const pathName = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [brandDetails, setBrandDetails] = useState<any>({
    brandName: "",
    supportEmail: "",
    phoneNumber: "",
    address: "",
    officialWebsite: "",
    logo: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async (id: string) => {
    setLoading(true);

    try {
      const res: any = await contract.methods.getProductByUniqueId(id).call();

      if (
        res[1] === "" &&
        res[2] === "" &&
        res[4] === "0x0000000000000000000000000000000000000000"
      ) {
        setLoading(false);
        setProduct(null);
        toast.error("Product not found!");
        navigate("/verify");
        return;
      }

      const formattedData = {
        id: res[0],
        uniqueId: res[1],
        name: res[2],
        sku: res[3],
        owner: res[4],
        image: res[5],
        createdAt: res[6],
        purchased: res[7],
        purchasedBy: res[8],
      };

      setProduct(formattedData);

      await fetchBrandDetails(res[4]);

      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch product details. Please try again.");
    }
  };

  const fetchBrandDetails = async (BrandId: string) => {
    try {
      const res = await GetBrandProfileById(BrandId.toLowerCase());

      if (res.result === "success") {
        setBrandDetails(res.data);
      } else {
        toast.error(res.message ?? "Something went wrong. Try again later!");
      }
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong. Try again later!");
    }
  };

  useEffect(() => {
    if (pathName?.id) {
      fetchProductDetails(pathName?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return (
    <>
      <Header />
      {loading || !product ? (
        <section className="w-full h-[60vh] flex justify-center items-center">
          <Spinner className="h-10 w-10" />
        </section>
      ) : (
        <main className="w-full px-20 2xl:px-32 py-12">
          {!product?.purchased && (
            <Typography
              placeholder=""
              variant="h2"
              color="green"
              className="text-center text-green-700"
            >
              Product is Brand New. You can purchase it.
            </Typography>
          )}
          {product?.purchased && (
            <Typography
              placeholder=""
              variant="h2"
              color="red"
              className="text-center"
            >
              Product is already sold out.
            </Typography>
          )}
          <section className="h-fit border-b border-black/20 pt-5 pl-5 pb-4">
            <Typography placeholder="" variant="h4" className="">
              Product Details
            </Typography>
            <section className="flex items-start gap-x-5 mt-2">
              <section className="relative w-56 aspect-square border-2 border-black rounded-lg overflow-hidden shadow-[3px_3px_0_black]">
                <img
                  src={product?.image ?? ImagePlaceholder}
                  alt="Product"
                  className="absolute w-full h-full object-cover object-center"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = ImagePlaceholder;
                  }}
                />
              </section>
              <section className="flex flex-col gap-y-1.5">
                <div className="flex items-baseline gap-x-2">
                  <Typography placeholder="" variant="h5">
                    ID:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {product?.uniqueId}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    Name:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {product?.name}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2 mt-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    SKU:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {product?.sku}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2 mt-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    Created At:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {product?.createdAt
                      ? FormateDate(product?.createdAt, "MMM DD, YYYY")
                      : ""}
                  </Typography>
                </div>
                {product?.purchased && (
                  <div className="flex items-baseline gap-x-2 mt-2">
                    <Typography
                      placeholder=""
                      variant="h5"
                      className="font-bold"
                    >
                      Purchased By:
                    </Typography>
                    <Typography placeholder="" variant="paragraph" className="">
                      {product?.purchasedBy ?? ""}
                    </Typography>
                  </div>
                )}
              </section>
            </section>
          </section>
          <section className="mt-5 pl-5">
            <Typography
              placeholder=""
              variant="h4"
              color="blue-gray"
              className="leading-none mb-6"
            >
              Brand Details
            </Typography>
            <section className="flex items-start gap-x-5 mt-2">
              <section className="relative w-56 aspect-square border-2 border-black rounded-lg overflow-hidden shadow-[3px_3px_0_black]">
                <img
                  src={brandDetails?.logo ?? ImagePlaceholder}
                  alt="Product"
                  className="absolute w-full h-full object-cover object-center"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = ImagePlaceholder;
                  }}
                />
              </section>
              <section className="flex flex-col gap-y-1.5">
                <div className="flex items-baseline gap-x-2">
                  <Typography placeholder="" variant="h5">
                    Brand Name:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {brandDetails?.brandName ?? ""}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    Support Email:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {brandDetails?.supportEmail ?? ""}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2 mt-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    Phone Number:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {brandDetails?.phoneNumber ?? ""}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2 mt-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    Address:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {brandDetails?.address ?? ""}
                  </Typography>
                </div>
                <div className="flex items-baseline gap-x-2 mt-2">
                  <Typography placeholder="" variant="h5" className="font-bold">
                    Official Website:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {brandDetails?.officialWebsite ?? ""}
                  </Typography>
                </div>
              </section>
            </section>
          </section>
        </main>
      )}
    </>
  );
}
