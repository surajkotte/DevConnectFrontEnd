import React, { useState } from "react";
import { addUserData } from "../reduxSlice/userSlice";
import { useDispatch } from "react-redux";
import Globe from "../Utils/Globe";
//import { Globe } from "lucide-react";
import Particle from "../Utils/particles";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(mail, password);
    try {
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
      console.log(responseData.status);
      if (responseData["messageType"] == "E") {
        setErrorMsg(responseData?.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else if (responseData["messageType"] == "S") {
        dispatch(addUserData(responseData?.data));
        console.log("here");
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMsg(err.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
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
              <h3 className="font-semibold text-2xl text-white">Sign In</h3>
              <p className="text-white">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white tracking-wide">
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
                <label className="mb-5 text-sm font-medium text-white tracking-wide">
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
      {errorMsg && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error	">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
