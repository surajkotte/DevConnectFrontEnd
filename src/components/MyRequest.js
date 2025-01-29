import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { addToast, clearToast } from "../reduxSlice/ToastSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
const UserConnectionInfo = ({ userInfo, isOpen, toggleAccordion }) => {
  const dispatch = useDispatch();

  const connectionClicked = async (status, userId) => {
    try {
      const url = `http://localhost:3000/request/review/${status}/${userId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData?.messageType === "S") {
        dispatch(
          addToast({
            messageType: responseData?.messageType,
            message: "Connection request " + status,
          })
        );
      } else {
        dispatch(
          addToast({
            messageType: responseData?.messageType,
            message: responseData?.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        addToast({
          messageType: "E",
          message: err.message,
        })
      );
    }
  };

  return (
    <div className="flex flex-col border-[1px] w-full rounded-2xl p-4 gap-4 self-start min-w-0">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="m-1 w-16 h-16 rounded-full">
            <img src={userInfo?.photoURL} alt="Avatar" />
          </div>
        </div>

        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between">
            <span className="font-medium">{userInfo?.firstName}</span>
            <div className="flex gap-2">
              <button
                onClick={() => connectionClicked("accepted", userInfo?._id)}
                className=" text-green-700"
              >
                <CheckCircleOutlineOutlinedIcon />
              </button>
              <button
                onClick={() => connectionClicked("rejected", userInfo?._id)}
                className=" text-red-700"
              >
                <CancelOutlinedIcon />
              </button>
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

      {isOpen && (
        <div className="flex flex-wrap w-full overflow-hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </div>
      )}
    </div>
  );
};
const MyRequest = () => {
  const [userRequests, setUserRequest] = useState("");
  const [accOpenIndex, setAccOpenIndex] = useState("");
  const dispatch = useDispatch();
  const fetchRequests = async (req, res) => {
    try {
      dispatch(showLoader());
      const response = await fetch("http://localhost:3000/user/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      dispatch(hideLoader());
      if (responseData?.messageType == "E") {
        addToast({
          messageType: responseData?.messageType,
          message: responseData?.message,
        });
      } else if (responseData?.messageType == "S") {
        setUserRequest(responseData?.data);
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
    if (!userRequests) {
      fetchRequests();
    }
  }, []);
  return (
    <div className="grow w-full h-full shadow rounded overflow-y-auto">
      {userRequests && userRequests?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full p-3 max-w-[95%] m-auto">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {userRequests?.map((userInfo, index) => {
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

export default MyRequest;
