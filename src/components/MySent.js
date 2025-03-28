import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { addToast } from "../reduxSlice/ToastSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";
const UserConnectionInfo = ({ userInfo, isOpen, toggleAccordion }) => {
  return (
    <div className="flex flex-col border-[1px] w-full rounded-2xl p-4 gap-4">
      <div className="flex items-center gap-4 w-full">
        <div className="avatar">
          <div className=" m-1 w-16 h-16 rounded-full">
            <img src={userInfo?.photoURL} />
          </div>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between">
            <span className="font-medium">{userInfo?.firstName}</span>
            <div className="rounded-3xl bg-zinc-500 p-2 text-sm text-white">
              <span className=" text-sm">Pending</span>
            </div>
          </div>
          <span className="text-gray-500">
            {userInfo?.company || "Not Mentioned"} |{" "}
            {userInfo?.designation || "Not Mentioned"}
          </span>
        </div>
        <button
          className="ml-auto"
          onClick={() => toggleAccordion(userInfo?._id)}
        >
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
      {isOpen && <div className="mt-4 text-sm text-gray-600">hello there</div>}
    </div>
  );
};
const MySent = () => {
  const [sentRequests, setSentRequest] = useState("");
  const [accOpenIndex, setAccOpenIndex] = useState("");
  const dispatch = useDispatch();
  const fetchRequests = async (req, res) => {
    try {
      dispatch(showLoader());
      const response = await fetch(
        "http://localhost:3000/user/pendingrequests",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseData = await response.json();
      dispatch(hideLoader());
      if (responseData?.messageType == "E") {
        addToast({
          messageType: responseData?.messageType,
          message: responseData?.message,
        });
      } else if (responseData?.messageType == "S") {
        setSentRequest(responseData?.data);
      }
    } catch (err) {
      addToast({
        messageType: responseData?.messageType,
        message: responseData?.message,
      });
    }
  };
  const toggleAccordion = (id) => {
    setAccOpenIndex((prev) => (prev === id ? null : id));
  };
  useEffect(() => {
    if (!sentRequests) {
      fetchRequests();
    }
  }, []);
  return (
    <div className="grow w-full h-full shadow rounded overflow-y-auto">
      {sentRequests && sentRequests?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full p-3 max-w-[95%] m-auto">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {sentRequests?.map((userInfo, index) => {
                if (index % 3 === colIndex) {
                  return (
                    <UserConnectionInfo
                      key={userInfo._id}
                      userInfo={userInfo}
                      isOpen={accOpenIndex === userInfo._id}
                      toggleAccordion={toggleAccordion}
                    />
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span className="opacity-50">No details found</span>
        </div>
      )}
    </div>
  );
};

export default MySent;
