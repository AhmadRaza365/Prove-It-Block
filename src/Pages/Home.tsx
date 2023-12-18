import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import Header from "../Components/Header";
import MobileScanningQRCode from "../Images/mobile-scanning-qr-code.svg";
import underline from "../Images/underline1.svg";
import scanningQRCode from "../Images/scanning-qr-code.webp";
import { MdOutlineQrCode, MdQrCodeScanner } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import {
  TbListDetails,
  TbMoodCrazyHappy,
  TbTruckDelivery,
} from "react-icons/tb";
import infoBulb from "../Images/info-bulb.webp";
import ListingProductDetails from "../Images/listing-product-details.webp";
import PastingQRCode from "../Images/pasting-qr-code.webp";
import PackagingProduct from "../Images/packaging-product.webp";
import HappyCustomer from "../Images/happy-customer.webp";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<
    "customer" | "manufacturer"
  >("customer");

  return (
    <>
      <Header />
      <main className="min-h-screen pb-44">
        {/* Hero Section */}
        <section className="relative w-full h-[90vh] overflow-hidden">
          <div className="animated-hero-circle-1 z-[1] absolute bottom-0 -left-16 w-[550px] h-[550px] aspect-square bg-secondary rounded-full blur-3xl"></div>
          <div className="animated-hero-circle-2 z-[1] absolute -top-10 -right-10 w-[550px] h-[550px] aspect-square bg-primary rounded-full blur-3xl"></div>

          <section className="z-[2] absolute w-full h-full px-20 2xl:px-32 flex items-center justify-between bg-white/40 backdrop-blur-2xl">
            <section className="h-fit">
              <h1 className="text-4xl font-bold text-black leading-snug">
                Unveiling <span className="bg-primary p-1">ProveItBlock</span>{" "}
                <br /> A One Scan{" "}
                <span className="relative inline-flex items-center justify-center">
                  Verification
                  <img
                    src={underline}
                    alt="underline"
                    className="absolute -bottom-3"
                  />
                </span>{" "}
                Solution
              </h1>
              <p className="text-xl font-normal text-black w-full max-w-[512px] text-justify mt-8 mb-5">
                Elevate your product security with ProveItBlock, where
                authenticity meets simplicity. Our revolutionary
                blockchain-powered system is your single scan gateway to
                absolute verification confidence.
              </p>
              <a href="/#how-it-works">
                <Button
                  placeholder={"Learn more"}
                >
                  Learn More
                </Button>
              </a>
            </section>
            <img
              src={MobileScanningQRCode}
              alt="Mobile Scanning QR Code"
              className="w-96 drop-shadow-lg"
            />
          </section>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="pt-24">
          <h2 className="text-4xl font-bold text-black text-center">
            How It Works?
          </h2>

          <section className="mx-auto my-5 w-fit flex items-center gap-x-4">
            <button
              className={`border-2 border-black text-xl font-normal text-black px-9 py-3 rounded-full ${
                selectedSection === "customer"
                  ? "bg-primary shadow-[4px_4px_0_black]"
                  : "bg-white"
              }`}
              onClick={() => {
                setSelectedSection("customer");
              }}
            >
              For Customer
            </button>

            <button
              className={`border-2 border-black text-xl font-normal text-black px-5 py-3 rounded-full ${
                selectedSection === "manufacturer"
                  ? "bg-primary shadow-[4px_4px_0_black]"
                  : "bg-white"
              }`}
              onClick={() => {
                setSelectedSection("manufacturer");
              }}
            >
              For Manufacturer
            </button>
          </section>

          <section
            className={`px-20 flex flex-col items-center gap-y-24 transition-all ease-in-out duration-200 ${
              selectedSection === "customer"
                ? "scale-100 pt-24 h-fit"
                : "scale-0 h-0"
            }`}
          >
            {/* Step 1 */}
            <section className="relative w-fit flex items-start gap-x-5 -translate-x-44">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex justify-center items-center shadow-[3px_3px_0_#DC6C9C]">
                <MdQrCodeScanner size={26} />
              </div>
              <section className="max-w-[340px]">
                <h3 className="text-2xl font-bold">Step 01</h3>
                <p className="text-xl font-normal mt-3.5">
                  Effortless Verification with a Scan! Locate the QR code on the
                  product's packaging and scan it using your smartphone or any
                  compatible device.
                </p>
              </section>
              <section className="relative border border-black bg-white w-96 h-44 rounded-xl shadow-[4px_4px_0_#DC6C9C] overflow-hidden">
                <img
                  src={scanningQRCode}
                  alt="Scanning QR Code"
                  className="w-full h-full object-cover object-top"
                />
              </section>

              <svg
                width="78"
                height="136"
                viewBox="0 0 78 136"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-full top-[70%]"
              >
                <g clipPath="url(#clip0_19_742)">
                  <path
                    d="M21.625 6.30466C28.8724 7.09676 36.2809 8.19876 41.9615 13.1849C47.0339 17.6445 49.9377 24.0883 51.0568 30.6547C52.2726 37.8053 51.0543 45.2433 48.4462 51.961C47.1048 55.417 45.4259 58.7213 43.4942 61.8835C42.5295 63.4488 41.5065 64.9876 40.4421 66.4853C39.3777 67.9831 38.2989 69.5051 36.7697 70.5533C35.4582 71.4432 33.7545 71.8032 32.244 71.2579C30.6437 70.6838 29.7917 69.1151 29.5 67.5178C28.8423 63.9088 30.3416 59.8556 32.1231 56.7522C35.5608 50.7423 42.607 45.3334 49.9011 47.0009C57.1951 48.6684 61.1189 56.2049 62.22 63.1473C63.321 70.0898 62.6096 78.2245 61.1357 85.3869C58.343 98.9812 52.0358 111.858 42.717 122.176C41.567 123.458 40.361 124.682 39.1137 125.865C37.685 127.229 37.0933 123.066 38.0674 122.107C46.7424 113.603 53.3299 103.214 57.0659 91.6295C58.9062 85.9113 60.0788 79.9602 60.4047 73.966C60.7654 67.4987 60.5776 60.2523 56.0075 55.1701C53.9525 52.8853 51.1383 51.2677 48.0331 51.0651C44.928 50.8624 41.6311 52.0187 38.9938 53.8639C36.3566 55.7091 34.3449 58.19 32.9625 60.9961C32.3701 62.1987 31.8822 63.4883 31.6079 64.8062C31.4839 65.4154 31.3476 65.9761 31.7835 66.4743C32.2949 67.0667 33.1419 67.2335 33.8913 67.2188C36.9882 67.1449 38.923 63.4662 40.4431 61.2029C42.2696 58.4801 43.9211 55.6366 45.3247 52.6704C47.8961 47.231 49.6407 41.1761 49.3382 35.104C49.0225 28.7361 46.4416 22.3857 41.8954 17.8855C36.4632 12.4959 28.8533 11.3728 21.5864 10.5443C20.0772 10.3701 20.2372 6.16155 21.6469 6.30943L21.6444 6.29974L21.625 6.30466Z"
                    fill="#DC6C9C"
                  />
                  <path
                    d="M41.2546 111.044L36.7052 122.35L34.5171 127.795C33.9112 129.311 32.9372 131.002 33.011 132.675L32.2372 130.561C33.9127 131.147 35.8503 130.366 37.442 129.849C39.242 129.258 41.0223 128.59 42.8051 127.931C46.3803 126.611 50.1345 125.143 53.9754 124.87C55.4254 124.771 55.3691 128.819 53.9149 129.105C49.8261 129.905 45.9912 131.177 42.0962 132.619C40.1802 133.322 38.2666 134.035 36.2943 134.597C34.6879 135.056 33.2118 135.338 31.5946 134.778C30.9146 134.538 30.847 133.214 30.8208 132.664C30.7287 130.593 31.4012 128.689 32.1683 126.792C33.0099 124.701 33.8515 122.61 34.6906 120.509L39.7474 107.949C40.0961 107.087 40.9165 107.271 41.29 107.971C41.7856 108.908 41.6273 110.114 41.2474 111.056L41.2546 111.044Z"
                    fill="#DC6C9C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_19_742">
                    <rect
                      width="128.01"
                      height="47.78"
                      fill="white"
                      transform="matrix(0.245913 0.969292 0.969292 -0.245913 0 11.7498)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </section>
            {/* Step 2 */}
            <section className="w-fit flex items-start gap-x-5 translate-x-24">
              <section className="relative border border-black bg-white w-96 h-44 rounded-xl shadow-[4px_4px_0_#DC6C9C] overflow-hidden">
                <img
                  src={infoBulb}
                  alt="Info bulb"
                  className="w-full h-full object-cover object-center"
                />
              </section>
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex justify-center items-center shadow-[3px_3px_0_#DC6C9C]">
                <HiOutlineLightBulb size={26} />
              </div>
              <section className="max-w-[370px]">
                <h3 className="text-2xl font-bold">Step 02</h3>
                <p className="text-xl font-normal mt-3.5">
                  Dive into Product Insights! Receive comprehensive product
                  information and check the authenticity status. Uncover the
                  true identity of the product, whether it's an authentic or a
                  fake one.
                </p>
              </section>
            </section>
          </section>

          <section
            className={`px-20 flex flex-col items-center gap-y-24 pt-24 transition-all ease-in-out duration-200 ${
              selectedSection === "manufacturer"
                ? "scale-100 pt-24 h-fit"
                : "scale-0 h-0"
            }`}
          >
            {/* Step 1 */}
            <section className="relative w-fit flex items-start gap-x-5 -translate-x-44">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex justify-center items-center shadow-[3px_3px_0_#DC6C9C]">
                <TbListDetails size={26} />
              </div>
              <section className="max-w-[340px]">
                <h3 className="text-2xl font-bold">Step 01</h3>
                <p className="text-xl font-normal mt-3.5">
                  List down Your Product on the Dashboard! The journey to
                  establishing trust starts with a listing it on ProveItBlock.
                </p>
              </section>
              <section className="relative border border-black bg-white w-96 h-44 rounded-xl shadow-[4px_4px_0_#DC6C9C] overflow-hidden">
                <img
                  src={ListingProductDetails}
                  alt="Listing Product Details"
                  className="w-full h-full object-cover object-center"
                />
              </section>
              <svg
                width="78"
                height="136"
                viewBox="0 0 78 136"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-full top-[70%]"
              >
                <g clipPath="url(#clip0_19_742)">
                  <path
                    d="M21.625 6.30466C28.8724 7.09676 36.2809 8.19876 41.9615 13.1849C47.0339 17.6445 49.9377 24.0883 51.0568 30.6547C52.2726 37.8053 51.0543 45.2433 48.4462 51.961C47.1048 55.417 45.4259 58.7213 43.4942 61.8835C42.5295 63.4488 41.5065 64.9876 40.4421 66.4853C39.3777 67.9831 38.2989 69.5051 36.7697 70.5533C35.4582 71.4432 33.7545 71.8032 32.244 71.2579C30.6437 70.6838 29.7917 69.1151 29.5 67.5178C28.8423 63.9088 30.3416 59.8556 32.1231 56.7522C35.5608 50.7423 42.607 45.3334 49.9011 47.0009C57.1951 48.6684 61.1189 56.2049 62.22 63.1473C63.321 70.0898 62.6096 78.2245 61.1357 85.3869C58.343 98.9812 52.0358 111.858 42.717 122.176C41.567 123.458 40.361 124.682 39.1137 125.865C37.685 127.229 37.0933 123.066 38.0674 122.107C46.7424 113.603 53.3299 103.214 57.0659 91.6295C58.9062 85.9113 60.0788 79.9602 60.4047 73.966C60.7654 67.4987 60.5776 60.2523 56.0075 55.1701C53.9525 52.8853 51.1383 51.2677 48.0331 51.0651C44.928 50.8624 41.6311 52.0187 38.9938 53.8639C36.3566 55.7091 34.3449 58.19 32.9625 60.9961C32.3701 62.1987 31.8822 63.4883 31.6079 64.8062C31.4839 65.4154 31.3476 65.9761 31.7835 66.4743C32.2949 67.0667 33.1419 67.2335 33.8913 67.2188C36.9882 67.1449 38.923 63.4662 40.4431 61.2029C42.2696 58.4801 43.9211 55.6366 45.3247 52.6704C47.8961 47.231 49.6407 41.1761 49.3382 35.104C49.0225 28.7361 46.4416 22.3857 41.8954 17.8855C36.4632 12.4959 28.8533 11.3728 21.5864 10.5443C20.0772 10.3701 20.2372 6.16155 21.6469 6.30943L21.6444 6.29974L21.625 6.30466Z"
                    fill="#DC6C9C"
                  />
                  <path
                    d="M41.2546 111.044L36.7052 122.35L34.5171 127.795C33.9112 129.311 32.9372 131.002 33.011 132.675L32.2372 130.561C33.9127 131.147 35.8503 130.366 37.442 129.849C39.242 129.258 41.0223 128.59 42.8051 127.931C46.3803 126.611 50.1345 125.143 53.9754 124.87C55.4254 124.771 55.3691 128.819 53.9149 129.105C49.8261 129.905 45.9912 131.177 42.0962 132.619C40.1802 133.322 38.2666 134.035 36.2943 134.597C34.6879 135.056 33.2118 135.338 31.5946 134.778C30.9146 134.538 30.847 133.214 30.8208 132.664C30.7287 130.593 31.4012 128.689 32.1683 126.792C33.0099 124.701 33.8515 122.61 34.6906 120.509L39.7474 107.949C40.0961 107.087 40.9165 107.271 41.29 107.971C41.7856 108.908 41.6273 110.114 41.2474 111.056L41.2546 111.044Z"
                    fill="#DC6C9C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_19_742">
                    <rect
                      width="128.01"
                      height="47.78"
                      fill="white"
                      transform="matrix(0.245913 0.969292 0.969292 -0.245913 0 11.7498)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </section>
            {/* Step 2 */}
            <section className="relative w-fit flex items-start gap-x-5 translate-x-24">
              <section className="relative border border-black bg-white w-96 h-44 rounded-xl shadow-[4px_4px_0_#DC6C9C] overflow-hidden">
                <img
                  src={PastingQRCode}
                  alt="Pasting QR Code"
                  className="w-full h-full object-cover object-center"
                />
              </section>
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex justify-center items-center shadow-[3px_3px_0_#DC6C9C]">
                <MdOutlineQrCode size={26} />
              </div>
              <section className="max-w-[370px]">
                <h3 className="text-2xl font-bold">Step 02</h3>
                <p className="text-xl font-normal mt-3.5">
                  Our system will generate a unique ID along with a QR code.
                  Download the system-generated QR code and paste it onto your
                  product's packaging.
                </p>
              </section>

              <svg
                width="138"
                height="150"
                viewBox="0 0 138 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-full top-[55%]"
              >
                <g clipPath="url(#clip0_19_751)">
                  <path
                    d="M93.6674 27.3318C85.4614 22.2416 75.741 19.5305 65.9666 19.6976C61.0775 19.7778 55.3525 20.2224 51.4086 23.4796C47.8079 26.4569 47.3087 31.1119 48.1767 35.3406C49.2075 40.3622 51.9349 44.9957 54.6713 49.2532C57.8804 54.24 61.5802 58.8933 65.0178 63.7311C66.6634 66.047 68.3443 68.3956 69.6589 70.9159C70.7239 72.9404 71.3971 75.2366 70.3703 77.4564C68.522 81.4747 62.9619 82.3397 59.0624 82.275C53.5644 82.1914 48.1876 80.8596 43.0276 79.1607C37.8676 77.4617 33.0063 75.3513 28.3318 72.7689C19.3787 67.8311 9.24661 60.723 7.24349 50.0353C6.82413 47.8008 6.88143 45.223 8.36137 43.3201C9.8413 41.4171 12.0399 40.7326 14.2797 40.6647C19.3296 40.5063 24.0884 43.1469 28.0845 45.8619C32.4915 48.8647 36.347 52.5792 39.9165 56.4998C43.4861 60.4204 46.7346 64.5312 49.7285 68.857C61.8472 86.3768 69.1893 107.033 71.0556 128.301C71.2871 130.957 71.4358 133.622 71.5154 136.29C71.538 137.003 72.1971 137.718 72.7889 138.047C73.2265 138.286 73.9873 138.437 73.9816 137.706C73.8624 126.65 72.0976 115.635 68.9973 105.073C65.897 94.5107 61.3523 84.1658 55.5747 74.6929C49.7971 65.2199 42.8874 56.3313 34.6372 48.9166C30.5156 45.216 25.9204 41.9951 20.7974 39.7755C16.7778 38.0315 10.8723 36.8812 7.12308 40.0248C3.00691 43.4699 4.58676 49.7064 6.32768 53.8357C8.52789 59.0298 12.3905 63.3794 16.6725 66.9849C25.1663 74.1475 35.7666 79.2764 46.4716 82.4064C51.6552 83.92 57.1535 85.1172 62.6244 84.7578C66.6655 84.4958 71.8245 82.8542 73.0987 78.5238C73.816 76.0737 73.0061 73.5403 71.9068 71.3703C70.5979 68.7951 68.9018 66.3856 67.2482 64.0222C63.7378 59.0165 59.8899 54.2359 56.5533 49.1106C53.7787 44.8478 50.8739 40.0163 50.2757 34.8479C50.0282 32.7193 50.1978 30.5299 51.1643 28.5584C52.3392 26.1551 54.6248 24.5517 57.1018 23.6307C61.9906 21.8152 67.6731 21.7993 72.7647 22.2747C77.8562 22.7501 82.6842 23.9806 87.2962 25.9232C89.5446 26.8695 91.697 28.0142 93.7625 29.2922C94.1972 29.5586 94.8417 29.6083 94.8864 28.9712C94.9312 28.334 94.1824 27.6326 93.6879 27.3208L93.6674 27.3318Z"
                    fill="#DC6C9C"
                  />
                  <path
                    d="M63.5242 119.765C66.1838 126.499 68.847 133.239 72.0035 139.765C72.2643 140.298 74.3149 142.154 74.4124 140.616C74.6785 136.527 75.135 132.448 75.7997 128.394C76.4643 124.341 77.5118 120.392 78.2877 116.365C78.4679 115.439 76.3073 113.297 75.9009 114.474C74.5558 118.411 73.8535 122.64 73.1964 126.724C72.5393 130.808 72.0778 134.977 71.8096 139.127L74.2185 139.978C71.16 133.667 68.5572 127.153 65.9784 120.635C65.6966 119.932 65.1476 119.192 64.3781 118.96C63.7965 118.781 63.25 119.093 63.5138 119.762L63.5242 119.765Z"
                    fill="#DC6C9C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_19_751">
                    <rect
                      width="121"
                      height="90"
                      fill="white"
                      transform="translate(79.7803 0.672729) rotate(61.6701)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </section>
            {/* Step 3 */}
            <section className="relative w-fit flex items-start gap-x-5 -translate-x-44">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex justify-center items-center shadow-[3px_3px_0_#DC6C9C]">
                <TbTruckDelivery size={26} />
              </div>
              <section className="max-w-[340px]">
                <h3 className="text-2xl font-bold">Step 03</h3>
                <p className="text-xl font-normal mt-3.5">
                  Record the Sale for Seamless Tracking! Upon purchase,
                  effortlessly update our system by adding a record that the
                  specific product has been sold to the customer.
                </p>
              </section>
              <section className="relative border border-black bg-white w-96 h-44 rounded-xl shadow-[4px_4px_0_#DC6C9C] overflow-hidden">
                <img
                  src={PackagingProduct}
                  alt="Packaging Product"
                  className="w-full h-full object-cover object-center"
                />
              </section>
              <svg
                width="78"
                height="136"
                viewBox="0 0 78 136"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-full top-[75%]"
              >
                <g clipPath="url(#clip0_19_742)">
                  <path
                    d="M21.625 6.30466C28.8724 7.09676 36.2809 8.19876 41.9615 13.1849C47.0339 17.6445 49.9377 24.0883 51.0568 30.6547C52.2726 37.8053 51.0543 45.2433 48.4462 51.961C47.1048 55.417 45.4259 58.7213 43.4942 61.8835C42.5295 63.4488 41.5065 64.9876 40.4421 66.4853C39.3777 67.9831 38.2989 69.5051 36.7697 70.5533C35.4582 71.4432 33.7545 71.8032 32.244 71.2579C30.6437 70.6838 29.7917 69.1151 29.5 67.5178C28.8423 63.9088 30.3416 59.8556 32.1231 56.7522C35.5608 50.7423 42.607 45.3334 49.9011 47.0009C57.1951 48.6684 61.1189 56.2049 62.22 63.1473C63.321 70.0898 62.6096 78.2245 61.1357 85.3869C58.343 98.9812 52.0358 111.858 42.717 122.176C41.567 123.458 40.361 124.682 39.1137 125.865C37.685 127.229 37.0933 123.066 38.0674 122.107C46.7424 113.603 53.3299 103.214 57.0659 91.6295C58.9062 85.9113 60.0788 79.9602 60.4047 73.966C60.7654 67.4987 60.5776 60.2523 56.0075 55.1701C53.9525 52.8853 51.1383 51.2677 48.0331 51.0651C44.928 50.8624 41.6311 52.0187 38.9938 53.8639C36.3566 55.7091 34.3449 58.19 32.9625 60.9961C32.3701 62.1987 31.8822 63.4883 31.6079 64.8062C31.4839 65.4154 31.3476 65.9761 31.7835 66.4743C32.2949 67.0667 33.1419 67.2335 33.8913 67.2188C36.9882 67.1449 38.923 63.4662 40.4431 61.2029C42.2696 58.4801 43.9211 55.6366 45.3247 52.6704C47.8961 47.231 49.6407 41.1761 49.3382 35.104C49.0225 28.7361 46.4416 22.3857 41.8954 17.8855C36.4632 12.4959 28.8533 11.3728 21.5864 10.5443C20.0772 10.3701 20.2372 6.16155 21.6469 6.30943L21.6444 6.29974L21.625 6.30466Z"
                    fill="#DC6C9C"
                  />
                  <path
                    d="M41.2546 111.044L36.7052 122.35L34.5171 127.795C33.9112 129.311 32.9372 131.002 33.011 132.675L32.2372 130.561C33.9127 131.147 35.8503 130.366 37.442 129.849C39.242 129.258 41.0223 128.59 42.8051 127.931C46.3803 126.611 50.1345 125.143 53.9754 124.87C55.4254 124.771 55.3691 128.819 53.9149 129.105C49.8261 129.905 45.9912 131.177 42.0962 132.619C40.1802 133.322 38.2666 134.035 36.2943 134.597C34.6879 135.056 33.2118 135.338 31.5946 134.778C30.9146 134.538 30.847 133.214 30.8208 132.664C30.7287 130.593 31.4012 128.689 32.1683 126.792C33.0099 124.701 33.8515 122.61 34.6906 120.509L39.7474 107.949C40.0961 107.087 40.9165 107.271 41.29 107.971C41.7856 108.908 41.6273 110.114 41.2474 111.056L41.2546 111.044Z"
                    fill="#DC6C9C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_19_742">
                    <rect
                      width="128.01"
                      height="47.78"
                      fill="white"
                      transform="matrix(0.245913 0.969292 0.969292 -0.245913 0 11.7498)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </section>
            {/* Step 4 */}
            <section className="w-fit flex items-start gap-x-5 translate-x-24">
              <section className="relative border border-black bg-white w-96 h-44 rounded-xl shadow-[4px_4px_0_#DC6C9C] overflow-hidden">
                <img
                  src={HappyCustomer}
                  alt="Happy Customer"
                  className="w-full h-full object-cover object-center"
                />
              </section>
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex justify-center items-center shadow-[3px_3px_0_#DC6C9C]">
                <TbMoodCrazyHappy size={26} />
              </div>
              <section className="max-w-[370px]">
                <h3 className="text-2xl font-bold">Step 04</h3>
                <p className="text-xl font-normal mt-3.5">
                  Our system will generate a unique ID along with a QR code.
                  Download the system-generated QR code and paste it onto your
                  product's packaging.
                </p>
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
