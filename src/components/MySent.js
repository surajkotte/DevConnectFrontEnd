import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { addToast } from "../reduxSlice/ToastSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";
const UserConnectionInfo = ({ userInfo, isOpen, toggleAccordion }) => {
  return (
    <div className="flex flex-col sm:w-[48%] lg:w-[32%] border-[1px] rounded-2xl p-4 gap-4">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className=" m-1 w-16 h-16 rounded-full">
            <img src={userInfo?.photoURL} />
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <div className="flex justify-between">
            <span className="font-medium">{userInfo?.firstName}</span>
            <div className="rounded-3xl bg-zinc-500 p-1">
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
  useEffect(() => {
    if (!sentRequests) {
      fetchRequests();
    }
  }, []);
  return (
    <>
      {sentRequests && sentRequests?.length != 0 ? (
        <>
          <div className="p-2 flex flex-wrap gap-4 justify-between">
            {sentRequests &&
              sentRequests?.map((userInfo, index) => {
                return (
                  <UserConnectionInfo
                    userInfo={userInfo}
                    key={userInfo?._id}
                    className=" overflow-y-auto"
                    isOpen={accOpenIndex == userInfo?._id}
                    toggleAccordion={setAccOpenIndex}
                    //requestStatus={isRequestSent}
                    //setUserData={setConnectionStatus}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <>
          <div>No connections found</div>
        </>
      )}
    </>
  );
};

export default MySent;
