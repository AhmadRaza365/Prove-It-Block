import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Spinner,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { GoArrowLeft } from "react-icons/go";
import { FiDownload } from "react-icons/fi";
import { FormateDate } from "../../utils/FormatDate";
import { QRCode } from "react-qrcode-logo";
import { GetProductByID, UpdateProductData } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

type props = {
  user: {
    authProvider: string;
    email: string;
    fullName: string;
    profilePic: string;
    uid: string;
  };
};

function ProductDetails({ user }: props) {
  const pathName = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const fetchProductDetails = async (id: string) => {
    setLoading(true);
    const res = await GetProductByID(id);

    setLoading(false);
    if (res.result === "success") {
      setProduct(res.product);
    } else {
      setProduct(null);
      toast.error(res.message);
    }
  };

  const markAsSold = async () => {
    if (customerName) {
      setIsUpdating(true);
      const newActivity = [
        ...product?.activity,
        {
          name: `Product Sold to ${customerName}`,
          date: new Date().toISOString(),
          description: "Product sold to the customer",
          isPublic: true,
        },
      ];

      const res = await UpdateProductData(product?.id, "Sold", newActivity);

      setIsUpdating(false);
      if (res.result === "success") {
        toast.success("Product marked as sold!");
        setOpen(false);
        fetchProductDetails(pathName?.id ?? "")
      } else if (res.result === "error") {
        toast.error(res.message);
      }
    } else {
      toast.error("Enter Customer Name!");
    }
  };

  useEffect(() => {
    if (pathName?.id) {
      fetchProductDetails(pathName?.id);
    }
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
            <div className="ml-3 -mb-1 bg-primary/10 text-primary font-bold px-6 py-2 rounded-full text-sm">
              {product?.status}
            </div>
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
          </section>
          <section className="grid grid-cols-12 gap-5">
            <section className="col-span-8">
              <section className="h-fit border-b border-black/20 pt-5 pl-5 pb-4">
                <Typography placeholder="" variant="h4" className="">
                  Product Details
                </Typography>
                <section className="flex items-center gap-x-5 mt-2">
                  <section className="relative w-28 aspect-square border-2 border-black rounded-lg overflow-hidden shadow-[3px_3px_0_black]">
                    <img
                      src={product?.image}
                      alt="Product"
                      className="absolute w-full h-full object-cover object-center"
                    />
                  </section>
                  <section>
                    <div className="flex items-baseline gap-x-2">
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className="font-bold"
                      >
                        ID:
                      </Typography>
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className=""
                      >
                        {product?.id}
                      </Typography>
                    </div>
                    <div className="flex items-baseline gap-x-2 mt-2">
                      <Typography
                        placeholder=""
                        variant="paragraph"
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
                        variant="paragraph"
                        className="font-bold"
                      >
                        Date:
                      </Typography>
                      <Typography
                        placeholder=""
                        variant="paragraph"
                        className=""
                      >
                        {FormateDate(product?.createdAt, "MMM DD, YYYY")}
                      </Typography>
                    </div>
                  </section>
                </section>
              </section>

              <section className="w-[32rem] mt-5 pl-5">
                <Typography
                  placeholder=""
                  variant="h4"
                  color="blue-gray"
                  className="leading-none mb-6"
                >
                  Activity Timeline
                </Typography>
                <Timeline>
                  {product?.activity.map((step: any, index: number) => {
                    return (
                      <TimelineItem key={index}>
                        <TimelineConnector />
                        <TimelineHeader className="h-3">
                          <TimelineIcon />
                          <Typography
                            placeholder=""
                            variant="h6"
                            color="blue-gray"
                            className="leading-none"
                          >
                            {step?.name}
                          </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8">
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="leading-none mb-2"
                          >
                            {FormateDate(step?.date, "MMM DD, YYYY")}
                          </Typography>
                          <Typography
                            placeholder=""
                            variant="small"
                            color="gray"
                            className="font-normal text-gray-600"
                          >
                            {step?.description}
                          </Typography>
                        </TimelineBody>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
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

              <div className="w-full flex justify-center">
                <QRCode
                  value={`${window.location.origin}/verify/${product?.id}`}
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
