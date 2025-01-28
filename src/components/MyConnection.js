import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { AddCircleOutlineOutlined, CheckCircleOutline } from "@mui/icons-material";
import { addToast } from "../reduxSlice/ToastSlice";

const UserConnectionInfo = ({ userInfo, isOpen, toggleAccordion }) => {
  const dispatch = useDispatch();

  const connectionClicked = async (userId) => {
    try {
      const url = `http://localhost:3000/request/send/interested/${userId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();

      dispatch(
        addToast({
          messageType: responseData?.messageType,
          message: responseData?.message,
        })
      );
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
    <div className="flex flex-col sm:w-[48%] lg:w-[32%] border-[1px] rounded-2xl p-4 gap-4 self-start">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="m-1 w-16 h-16 rounded-full">
            <img src={userInfo?.photoURL} alt="Avatar" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-between">
            <span className="font-medium">{userInfo?.firstName}</span>
            <button onClick={() => connectionClicked(userInfo?._id)}>
              {false ? <CheckCircleOutline /> : <AddCircleOutlineOutlined />}
            </button>
          </div>
          <span className="text-gray-500">
            {userInfo?.company || "Not Mentioned"} | {userInfo?.designation || "Not Mentioned"}
          </span>
        </div>

        <button className="ml-auto" onClick={() => toggleAccordion(userInfo?._id)}>
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 text-sm text-gray-600 overflow-y-auto max-h-96">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </div>
      )}
    </div>
  );
};

const MyConnection = () => {
  const [accOpenIndex, setAccOpenIndex] = useState(null);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (userData.length !== 0) return;

    try {
      dispatch(showLoader());
      const response = await fetch("http://localhost:3000/user/allUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();

      if (responseData.messageType === "E") {
        dispatch(
          addToast({
            messageType: responseData.messageType,
            message: responseData.message,
          })
        );
      } else if (responseData?.data?.length) {
        setUserData(responseData.data);
      }
    } catch (err) {
      dispatch(
        addToast({
          messageType: "E",
          message: err.message,
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  const toggleAccordion = (id) => {
    setAccOpenIndex((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (userData.length === 0) {
      fetchConnections();
    }
  }, [userData]);

  return (
    <div className="p-2 flex flex-wrap gap-4 justify-between min-h-full max-h-full">
      {userData.length > 0 ? (
        userData.map((userInfo) => (
          <UserConnectionInfo
            key={userInfo._id}
            userInfo={userInfo}
            isOpen={accOpenIndex === userInfo._id}
            toggleAccordion={toggleAccordion}
          />
        ))
      ) : (
        <h1>No connections found</h1>
      )}
    </div>
  );
};

export default MyConnection;
