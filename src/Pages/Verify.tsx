import React, { useState } from "react";
import Header from "../Components/Header";
import { QrReader } from "react-qr-reader";
import toast from "react-hot-toast";
import { Typography } from "@material-tailwind/react";

export default function Verify() {
  const [data, setData] = useState("No result");

  return (
    <>
      <Header />
      <main className="py-10">
        <section className="min-h-screen w-full flex flex-col items-center">
          <Typography placeholder="" variant="h2" className="text-center">
            Scan QR Code to verify Product
          </Typography>
          <QrReader
            onResult={(result: any, error) => {
              if (!!result) {
                setData(result?.text);
                if (result?.text?.includes("http")) {
                  window.open(result?.text);
                }
              }

              if (!!error) {
                if (error.message === "Permission denied") {
                  toast.error("Permission to use camera was denied");
                  toast.error("Alow camera access to use service");
                }
              }
            }}
            constraints={{
              facingMode: "environment",
            }}
            className="w-full max-w-lg mx-auto"
          />
          <a className="text-lg text-green-600 underline underline-offset-4" href={data} target="_blank" rel="noreferrer">{data}</a>
        </section>
      </main>
    </>
  );
}
