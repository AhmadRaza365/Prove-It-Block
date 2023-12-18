import React, { useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Button, Input } from "@material-tailwind/react";
import { LogInWithEmailAndPassword, LogInWithGoogle } from "../utils/firebase";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [signingInWithGoogle, setSigningInWithGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickSignInWithGoogle = async () => {
    setSigningInWithGoogle(true);
    const res = await LogInWithGoogle();
    setSigningInWithGoogle(false);
    if (res.result === "error") {
      toast.error(res.message || "Something went wrong. Try again later!");
    } else {
      toast.success("Logined in successfully!");
      navigate("/dashboard");
    }
  };

  const clickSignInWithEmail = async () => {
    setSigningIn(true);
    const res = await LogInWithEmailAndPassword(email, password);
    if (res?.result === "success") {
      toast.success(res.message);
      setSigningIn(false);
      navigate("/dashboard");
    } else if (res?.result === "error") {
      setSigningIn(false);
      toast.error(res.message || "Something went wrong. Try again later!");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex items-center justify-center py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clickSignInWithEmail();
          }}
          className="flex flex-col gap-y-5 w-full max-w-none sm:max-w-md rounded-xl px-6 sm:px-8 py-6 sm:py-12 shadow-none sm:shadow-lg border-0 sm:border border-black/10"
        >
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Login
          </h1>

          <Input
            crossOrigin="Login"
            type="email"
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
          <Button
            placeholder="reset"
            variant="text"
            size="sm"
            className="py-0 px-0 w-fit ml-auto -mt-3"
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            Forgot Password?
          </Button>

          <Button
            placeholder="submit"
            type="submit"
            size="md"
            disabled={signingIn || signingInWithGoogle}
          >
            Login
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
            disabled={signingInWithGoogle || signingIn}
            type="button"
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
            Didn&apos;t have an account?{" "}
            <Link
              to="/register"
              className="underline underline-offset-4 font-semibold"
            >
              Register Here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;
