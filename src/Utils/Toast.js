import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearToast } from "../reduxSlice/ToastSlice";
const Toast = ({ children }) => {
  const [error, setError] = useState("");
  const toast = useSelector((store) => store.toast);
  const dispatch = useDispatch();
  var messageClass = "alert-info";
   (toast + " in toast");
  useEffect(() => {
    if (toast?.message) {
      if (toast.messageType == "E") {
        messageClass = "alert-error";
      } else if (toast.messageType == "S") {
        messageClass = "alert-success";
      }
       (messageClass + " " + toast?.messageType);
      setError({ message: toast.message, messageType: toast.messageType });
      const timer = setTimeout(() => {
        setError("");
        dispatch(clearToast());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);
  return (
    <>
      {error.message && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              error.messageType === "S"
                ? "alert-success"
                : error.messageType === "E"
                ? "alert-error"
                : "alert-info"
            }`}
          >
            <span>{error.message}</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Toast;
