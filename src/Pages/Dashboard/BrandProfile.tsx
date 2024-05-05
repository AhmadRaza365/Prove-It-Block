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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  GetBrandProfileById,
  UpdateBrandProfileById,
} from "../../utils/firebase";
import ImagePlaceholder from "../../Images/image-placeholder.avif";

function BrandProfile() {
  const { metaMaskAddress } = useSelector((state: any) => state.auth);
  const [isFetching, setIsFetching] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [brandDetails, setBrandDetails] = useState<any>({
    brandName: "",
    supportEmail: "",
    phoneNumber: "",
    address: "",
    officialWebsite: "",
    logo: "",
  });

  // States for the form fields
  const [brandName, setBrandName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [officialWebsite, setOfficialWebsite] = useState("");
  const [logo, setLogo] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenEditModel = () => setShowEditModal(!showEditModal);

  const fetchBrandDetails = async () => {
    try {
      setIsFetching(true);
      const res = await GetBrandProfileById(metaMaskAddress.toLowerCase());

      if (res.result === "success") {
        setBrandDetails(res.data);
      } else {
        toast.error(res.message ?? "Something went wrong. Try again later!");
      }
      setIsFetching(false);
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong. Try again later!");
      setIsFetching(false);
    }
  };

  const updateBrandProfile = async () => {
    if (
      brandName.trim() &&
      supportEmail.trim() &&
      phoneNumber.trim() &&
      address.trim() &&
      officialWebsite.trim() &&
      logo.trim()
    ) {
      setIsUpdating(true);

      try {
        // Call the API to update the brand profile
        const res = await UpdateBrandProfileById(metaMaskAddress.toLowerCase(), {
          brandName: brandName,
          supportEmail: supportEmail,
          phoneNumber: phoneNumber,
          address: address,
          officialWebsite: officialWebsite,
          logo: logo,
        });

        setIsUpdating(false);
        if (res.result === "success") {
          toast.success("Brand profile updated successfully!");
          setShowEditModal(false);
          setBrandName("");
          setSupportEmail("");
          setPhoneNumber("");
          setAddress("");
          setOfficialWebsite("");
          setLogo("");
          fetchBrandDetails();
        } else {
          toast.error(res.message ?? "Something went wrong. Try again later!");
        }
      } catch (error: any) {
        setIsUpdating(false);
        toast.error(error.message ?? "Something went wrong. Try again later!");
      }
    } else {
      setIsUpdating(false);
      return toast.error("All fields are required!");
    }
  };

  useEffect(() => {
    fetchBrandDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout pageName="Brand Profile">
      <section className="flex items-center gap-x-2.5">
        <Typography placeholder="" variant="h2">
          Brand Profile
        </Typography>
        <Button
          placeholder=""
          variant="gradient"
          color="cyan"
          size="md"
          className="bg-gradient-to-r from-secondary to-secondary/70 text-black"
          onClick={() => {
            handleOpenEditModel();
            setBrandName(brandDetails?.brandName ?? "");
            setSupportEmail(brandDetails?.supportEmail ?? "");
            setPhoneNumber(brandDetails?.phoneNumber ?? "");
            setAddress(brandDetails?.address ?? "");
            setOfficialWebsite(brandDetails?.officialWebsite ?? "");
            setLogo(brandDetails?.logo ?? "");
          }}
        >
          Edit
        </Button>
      </section>
      {isFetching ? (
        <section className="w-full h-[60vh] flex justify-center items-center">
          <Spinner className="h-8 w-8" />
        </section>
      ) : (
        <section className="flex flex-row items-center mt-16 border border-black/20 bg-white rounded-lg shadow-sm">
          <section className="flex flex-col grow py-5 px-0">
            <div className="px-5 flex items-center gap-x-2 border-b last:border-b-0 border-black/20 py-2">
              <Typography placeholder="" variant="h5">
                Brand Name:
              </Typography>
              <Typography placeholder="" variant="paragraph">
                {brandDetails?.brandName ?? ""}
              </Typography>
            </div>

            <div className="px-5 flex items-center gap-x-2 border-b last:border-b-0 border-black/20 py-2">
              <Typography placeholder="" variant="h5">
                Support Email:
              </Typography>
              <Typography placeholder="" variant="paragraph">
                {brandDetails?.supportEmail ?? ""}
              </Typography>
            </div>

            <div className="px-5 flex items-center gap-x-2 border-b last:border-b-0 border-black/20 py-2">
              <Typography placeholder="" variant="h5">
                Phone Number:
              </Typography>
              <Typography placeholder="" variant="paragraph">
                {brandDetails?.phoneNumber ?? ""}
              </Typography>
            </div>

            <div className="px-5 flex items-center gap-x-2 border-b last:border-b-0 border-black/20 py-2">
              <Typography placeholder="" variant="h5">
                Address:
              </Typography>
              <Typography placeholder="" variant="paragraph">
                {brandDetails?.address ?? ""}
              </Typography>
            </div>
            <div className="px-5 flex items-center gap-x-2 border-b last:border-b-0 border-black/20 py-2">
              <Typography placeholder="" variant="h5">
                Official Website:
              </Typography>
              <Typography placeholder="" variant="paragraph">
                {brandDetails?.officialWebsite ?? ""}
              </Typography>
            </div>
          </section>

          <section className="aspect-square h-full w-72 rounded-r-lg relative overflow-hidden border-l border-black/20">
            <img
              src={brandDetails?.logo ?? ImagePlaceholder}
              alt="logo"
              className="absolute top-0 left-0 w-full h-full object-cover object-center "
              onError={(e: any) => {
                e.target.src = ImagePlaceholder;
              }}
            />
          </section>
        </section>
      )}

      <Dialog
        placeholder=""
        open={showEditModal}
        handler={handleOpenEditModel}
        size="xs"
      >
        <DialogBody placeholder="" className="py-10 px-10">
          <form
            className="w-full flex flex-col gap-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              updateBrandProfile();
            }}
            onReset={() => {
              handleOpenEditModel();
              setBrandName(brandDetails?.brandName ?? "");
              setSupportEmail(brandDetails?.supportEmail ?? "");
              setPhoneNumber(brandDetails?.phoneNumber ?? "");
              setAddress(brandDetails?.address ?? "");
              setOfficialWebsite(brandDetails?.officialWebsite ?? "");
              setLogo(brandDetails?.logo ?? "");
            }}
          >
            <Input
              crossOrigin=""
              label="Brand Name"
              size="lg"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
              required
            />
            <Input
              crossOrigin=""
              label="Support Email"
              size="lg"
              type="email"
              value={supportEmail}
              onChange={(e) => {
                setSupportEmail(e.target.value);
              }}
              required
            />
            <Input
              crossOrigin=""
              label="Phone Number"
              type="tel"
              size="lg"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              required
            />
            <Input
              crossOrigin=""
              label="Address"
              type="text"
              size="lg"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
            <Input
              crossOrigin=""
              label="Official Website"
              type="url"
              size="lg"
              value={officialWebsite}
              onChange={(e) => {
                setOfficialWebsite(e.target.value);
              }}
              required
            />
            <Input
              crossOrigin=""
              label="Logo URL"
              type="url"
              size="lg"
              value={logo}
              onChange={(e) => {
                setLogo(e.target.value);
              }}
              required
            />

            <section className="flex justify-center items-center gap-x-2 mt-3">
              <Button
                placeholder=""
                variant="text"
                color="red"
                onClick={handleOpenEditModel}
                className=""
                type="reset"
                disabled={isUpdating}
              >
                <span>Cancel</span>
              </Button>
              <Button
                placeholder=""
                variant="gradient"
                color="cyan"
                type="submit"
                className="bg-gradient-to-r from-secondary to-secondary/70 text-black"
                onClick={() => {
                  // markAsSold();
                }}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </section>
          </form>
        </DialogBody>
      </Dialog>
    </DashboardLayout>
  );
}

export default BrandProfile;
