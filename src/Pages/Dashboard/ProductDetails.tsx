import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { GoArrowLeft } from "react-icons/go";
import { FiDownload } from "react-icons/fi";
import { FormateDate } from "../../utils/FormatDate";
import { QRCode } from "react-qrcode-logo";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { contract } from "../../utils/web3Provider";
import { useSelector } from "react-redux";
import ImagePlaceholder from "../../Images/image-placeholder.avif";

function ProductDetails() {
  const pathName = useParams();
  const navigate = useNavigate();
  const { metaMaskAddress } = useSelector((state: any) => state.auth);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
        navigate("/dashboard/products");
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setProduct(null);
      toast.error("Failed to fetch product details!");
    }
  };

  const markAsSold = async () => {
    if (customerName) {
      setIsUpdating(true);

      try {
        await contract.methods
          .purchaseProduct(parseInt(product.id), customerName)
          .send({
            from: metaMaskAddress,
          });

        setIsUpdating(false);
        toast.success("Product marked as sold!");
        setOpen(false);
        setCustomerName("");
        fetchProductDetails(pathName?.id ?? "");
      } catch (error) {
        setIsUpdating(false);
        toast.error("Failed to mark product as sold!");
        return;
      }
    } else {
      toast.error("Enter Customer Name!");
    }
  };

  useEffect(() => {
    if (pathName?.id) {
      fetchProductDetails(pathName?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return (
    <DashboardLayout pageName="Products">
      {loading ? (
        <section className="w-full h-[60vh] flex justify-center items-center">
          <Spinner className="h-8 w-8" />
        </section>
      ) : (
        <>
          <section className="flex items-center gap-x-0 border-b border-black/20 pb-1.5">
            <Button
              placeholder=""
              variant="text"
              color="white"
              size="sm"
              ripple={false}
              onClick={() => {
                window.history.back();
              }}
            >
              <GoArrowLeft size={36} className="-mt-1.5 text-black" />
            </Button>
            <Typography placeholder="" variant="h2" className="">
              {product?.name}
            </Typography>
            {product?.purchased ? (
              <div className="ml-3 bg-primary/10 text-primary font-bold px-6 py-2 rounded-full text-sm">
                Sold Out
              </div>
            ) : (
              <div className="ml-3 bg-green-500/10 text-green-500 font-bold px-6 py-2 rounded-full text-sm">
                Available
              </div>
            )}
            {!product?.purchased && (
              <Button
                placeholder=""
                color="pink"
                variant="filled"
                className="bg-primary ml-auto"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Mark As Sold
              </Button>
            )}
          </section>
          <section className="grid grid-cols-12 gap-5">
            <section className="col-span-8">
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
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className=""
                      >
                        {product?.uniqueId}
                      </Typography>
                    </div>
                    <div className="flex items-baseline gap-x-2">
                      <Typography
                        placeholder=""
                        variant="h5"
                        className="font-bold"
                      >
                        Name:
                      </Typography>
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className=""
                      >
                        {product?.name}
                      </Typography>
                    </div>
                    <div className="flex items-baseline gap-x-2 mt-2">
                      <Typography
                        placeholder=""
                        variant="h5"
                        className="font-bold"
                      >
                        SKU:
                      </Typography>
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className=""
                      >
                        {product?.sku}
                      </Typography>
                    </div>
                    <div className="flex items-baseline gap-x-2 mt-2">
                      <Typography
                        placeholder=""
                        variant="h5"
                        className="font-bold"
                      >
                        Created At:
                      </Typography>
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className=""
                      >
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
                        <Typography
                          placeholder=""
                          variant="paragraph"
                          className=""
                        >
                          {product?.purchasedBy ?? ""}
                        </Typography>
                      </div>
                    )}
                  </section>
                </section>
              </section>
            </section>
            <section className="col-span-4 h-full min-h-[80vh] border-l border-black/20 pt-5 px-8">
              <Typography
                placeholder=""
                variant="h3"
                className="mb-2 text-center"
              >
                QR Code
              </Typography>
              {product && (
                <>
                  <div className="w-full flex justify-center">
                    <QRCode
                      value={`${window.location.origin}/verify/${product?.uniqueId}`}
                      bgColor="#fff"
                      size={250}
                      quietZone={20}
                      id="product-qr-code"
                    />
                  </div>

                  <Button
                    placeholder=""
                    variant="gradient"
                    size="lg"
                    className="flex items-center mx-auto mt-8"
                    onClick={() => {
                      const canvas: any =
                        document.getElementById("product-qr-code");
                      var dataURL = canvas.toDataURL("image/png");
                      var link = document.createElement("a");
                      link.href = dataURL;
                      link.download = "qr-code.png";
                      link.click();
                    }}
                  >
                    <FiDownload size={18} className="-mt-1" />
                    Download QR Code
                  </Button>
                </>
              )}
            </section>
          </section>
          <Dialog placeholder="" open={open} handler={handleOpen} size="xs">
            <DialogBody placeholder="" className="py-10 px-10">
              <Input
                crossOrigin=""
                label="Customer Name"
                size="lg"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                }}
              />
              <section className="flex justify-center items-center mt-7">
                <Button
                  placeholder=""
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className=""
                  disabled={isUpdating}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  placeholder=""
                  variant="gradient"
                  color="cyan"
                  className="bg-gradient-to-r from-secondary to-secondary/70 text-black"
                  onClick={() => {
                    markAsSold();
                  }}
                  disabled={!customerName || isUpdating}
                >
                  <span>Confirm</span>
                </Button>
              </section>
            </DialogBody>
          </Dialog>
        </>
      )}
    </DashboardLayout>
  );
}

export default ProductDetails;
