import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { addToast, clearToast } from "../reduxSlice/ToastSlice";
const MyRequest = ({ userRequests }) => {
  const [userRequest, setUserRequest] = useState("");
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
        setUserRequest(responseData);
      }
    } catch (err) {
      addToast({
        messageType: responseData?.messageType,
        message: responseData?.message,
      });
    }
  };
  useEffect(() => {
    if (!userRequest) {
      fetchRequests();
    }
  }, []);
  return <>{userRequests ? <></> : <div>No requests Found</div>}</>;
};

export default MyRequest;
