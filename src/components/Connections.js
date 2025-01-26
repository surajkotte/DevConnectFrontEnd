import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";
import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";
import MyConnection from "./MyConnection";
import MyRequest from "./MyRequest";
import MySent from "./MySent";

const Connections = () => {
  const [activeTab, setActiveTab] = useState("connections");

  return (
    <div className="flex flex-col w-[90%] h-5/6 border-[1px] rounded-2xl items-center gap-5">
      <div className="flex lg:w-[30%] md:w-[90%] sm:w-[90%] h-10 mt-4 rounded-3xl border-[1px] justify-between items-center p-1">
        {/* Tab 1 */}
        <div
          className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
            activeTab === "connections"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-white"
          }`}
          onClick={() => setActiveTab("connections")}
        >
          Grow
        </div>

        {/* Tab 2 */}
        <div
          className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
            activeTab === "requests"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-white"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Received
        </div>
        <div
          className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
            activeTab === "sent"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-white"
          }`}
          onClick={() => setActiveTab("sent")}
        >
          Sent
        </div>
      </div>
      <div className=" flex h-full items-center overflow-y-auto ">
        {activeTab == "connections" ? (
          <MyConnection />
        ) : (
          <>{activeTab == "requests" ? <MyRequest /> : <MySent />}</>
        )}
      </div>
    </div>
  );
};

export default Connections;
