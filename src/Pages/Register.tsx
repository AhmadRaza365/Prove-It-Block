import React, { useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Button, Input } from "@material-tailwind/react";
import {
  RegisterWithEmailAndPassword,
  RegisterWithGoogle,
} from "../utils/firebase";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [signingInWithGoogle, setSigningInWithGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clickRegisterWithEmail = async () => {
    setSigningIn(true);
    const res = await RegisterWithEmailAndPassword(
      `${firstName} ${lastName}`,
      email,
      password
    );
    if (res?.result === "success") {
      toast.success(res.message);
      setSigningIn(false);
      navigate("/login");
    } else if (res?.result === "error") {
      setSigningIn(false);
      toast.error(res.message || "Something went wrong. Try again later!");
    }
  };

  const clickSignInWithGoogle = async () => {
    setSigningInWithGoogle(true);
    const res = await RegisterWithGoogle();
    setSigningInWithGoogle(false);
    if (res.result === "error") {
      toast.error(res.message || "Something went wrong. Try again later!");
    } else {
      toast.success("Logined in successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex items-center justify-center py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clickRegisterWithEmail();
          }}
          className="flex flex-col gap-y-5 w-full max-w-none sm:max-w-md rounded-xl px-6 sm:px-8 py-6 sm:py-12 shadow-none sm:shadow-lg border-0 sm:border border-black/10"
        >
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Register
          </h1>

          <Input
            crossOrigin="Login"
            type="text"
            label="First Name"
            size="lg"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
          <Input
            crossOrigin="Login"
            type="text"
            label="Last Name"
            size="lg"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
          <Input
            crossOrigin="Login"
            type="email"
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <div className="relative flex items-center w-full">
            <Input
              crossOrigin="Login"
              label="Password"
              size="lg"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <Button
              placeholder="button"
              size="sm"
              type="button"
              variant="text"
              className="!absolute right-2 rounded w-fit h-fit p-1 text-gray-800"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? (
                <BsEyeFill size={20} />
              ) : (
                <BsEyeSlashFill size={20} />
              )}
            </Button>
          </div>
          <div className="relative flex items-center w-full">
            <Input
              crossOrigin="Login"
              label="Confirm Password"
              size="lg"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              error={password !== confirmPassword}
            />
            <Button
              placeholder="button"
              size="sm"
              type="button"
              variant="text"
              className="!absolute right-2 rounded w-fit h-fit p-1 text-gray-800"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {!showConfirmPassword ? (
                <BsEyeFill size={20} />
              ) : (
                <BsEyeSlashFill size={20} />
              )}
            </Button>
          </div>

          <Button
            placeholder="submit"
            type="submit"
            size="md"
            disabled={signingIn || signingInWithGoogle}
          >
            Register
          </Button>

          <p className="text-center text-sm text-black/70 dark:text-white/70">
            OR
          </p>

          <Button
            placeholder=""
            variant="outlined"
            size="md"
            color="gray"
            className="flex items-center justify-center gap-3"
            type="button"
            disabled={signingInWithGoogle || signingIn}
            onClick={() => {
              clickSignInWithGoogle();
            }}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="Google"
              className="h-4 w-4"
            />
            Continue with Google
          </Button>

          <p className="text-center text-base text-black dark:text-white">
            Already have an account?{" "}
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

export default Register;
