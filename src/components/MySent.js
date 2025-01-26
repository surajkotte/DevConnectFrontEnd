import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { addToast } from "../reduxSlice/ToastSlice";
const MySent = () => {
  const [sentRequests, setSentRequest] = useState("");
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
        setSentRequest(responseData);
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
  return <>{!sentRequests ? <></> : <div>No requests sent</div>}</>;
};

export default MySent;
