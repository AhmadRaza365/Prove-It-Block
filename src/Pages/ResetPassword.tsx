import React, { useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { SendPasswordReset } from "../utils/firebase";
import toast from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");

  const clickSendEmail = async () => {
    setSigningIn(true);
    const res = await SendPasswordReset(email);
    setSigningIn(false);
    if (res.result === "error") {
      toast.error(res.message || "Something went wrong. Try again later!");
    } else {
      toast.success("Logined in successfully!");
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex items-center justify-center py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clickSendEmail();
          }}
          className="flex flex-col gap-y-5 w-full max-w-none sm:max-w-md rounded-xl px-6 sm:px-8 py-6 sm:py-12 shadow-none sm:shadow-lg border-0 sm:border border-black/10"
        >
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Reset Password
          </h1>

          <Input
            crossOrigin="Login"
            type="email"
            label="Email"
            size="lg"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Button
            placeholder="submit"
            type="submit"
            size="md"
            disabled={signingIn}
          >
            Reset
          </Button>

          <p className="text-center text-base text-black dark:text-white">
            Got the Password?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 font-semibold"
            >
              Login Here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default ResetPassword;
