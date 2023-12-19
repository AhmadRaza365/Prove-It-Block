import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  Spinner,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { FormateDate } from "../utils/FormatDate";
import { useParams } from "react-router-dom";
import { GetProductByID } from "../utils/firebase";
import toast from "react-hot-toast";

export default function VerificationStatus() {
  const pathName = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (pathName?.id) {
      fetchProductDetails(pathName?.id);
    }
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
          {product?.status.toLowerCase() === "new" && (
            <Typography
              placeholder=""
              variant="h2"
              color="green"
              className="text-center text-green-700"
            >
              Product is Brand New. You can purchase it.
            </Typography>
          )}
          {product?.status.toLowerCase() === "sold" && (
            <Typography
              placeholder=""
              variant="h2"
              color="red"
              className="text-center"
            >
              Product is already sold out. Don't purchase it.
            </Typography>
          )}
          <section className="h-fit border-b border-black/20 pt-5 pl-5 pb-4">
            <Typography placeholder="" variant="h4" className="">
              Product Details
            </Typography>
            <section className="flex items-center gap-x-5 mt-2">
              <section className="relative w-20 aspect-square border-2 border-black rounded-lg overflow-hidden shadow-[3px_3px_0_black]">
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
                    Name:
                  </Typography>
                  <Typography placeholder="" variant="paragraph" className="">
                    {product?.name}
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
                  <Typography placeholder="" variant="paragraph" className="">
                    {product?.sku}
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
              {product?.activity
                .filter((step: any) => step?.isPublic)
                .map((step: any, index: number) => {
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
        </main>
      )}
    </>
  );
}
