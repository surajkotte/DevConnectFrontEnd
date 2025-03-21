import React, { useState } from "react";
import { addUserData } from "../reduxSlice/userSlice";
import { useDispatch } from "react-redux";
import Globe from "../Utils/Globe";
//import { Globe } from "lucide-react";
import Particle from "../Utils/particles";
import { useNavigate } from "react-router-dom";
import { addToast } from "../reduxSlice/ToastSlice";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      dispatch(showLoader());
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: mail,
          password,
        }),
        credentials: "include",
      });
      const responseData = await res.json();
      if (responseData["messageType"] == "E") {
        dispatch(
          addToast({ message: responseData?.message, messageType: "E" })
        );
      } else if (responseData["messageType"] == "S") {
        dispatch(addUserData(responseData?.data));
        dispatch(addToast({ message: "Login Successful", messageType: "S" }));
        navigate("/dashboard");
      }
    } catch (err) {
      dispatch(addToast({ message: err?.message, messageType: "E" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center">
      <Particle />
      <div className="flex flex-row h-full w-full justify-between items-center">
        {/* Left: Login Form */}
        <div className="flex justify-center self-center z-10 w-full max-w-lg">
          <div className="p-12 bg-stone-500 mx-auto rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 border border-gray-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl ">Sign In</h3>
              <p className="">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-wide">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium  tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-500 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-500 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>Copyright © 2025-2026</span>
            </div>
          </div>
        </div>
        {/* <Globe /> */}
      </div>
    </div>
  );
};

export default Login;
