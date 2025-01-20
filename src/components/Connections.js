import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";
import AccordionDown from "../images/AccordionDropDown.png";
import AccordionUp from "../images/AccordionDropUp.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";
const Connections = () => {
  const [userData, setUserData] = useState("");
  const [accOpenIndex, setAccOpenIndex] = useState("");
  const dispatch = useDispatch();
  const fetchConnections = async (req, res) => {
    if (userData) return;
    dispatch(showLoader());
    try {
      const response = await fetch("http://localhost:3000/user/allUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      dispatch(hideLoader());
      if (responseData.messageType == "E") {
        dispatch(
          addToast({
            messageType: responseData.messageType,
            message: responseData?.message,
          })
        );
      } else {
        dispatch(hideLoader());
        if (responseData?.data?.length != 0) {
          setUserData(responseData?.data);
        }
        console.log(responseData?.data);
      }
    } catch (err) {
      dispatch(hideLoader());
      dispatch(
        addToast({
          messageType: "E",
          message: err.message,
        })
      );
    }
  };
  useEffect(() => {
    if (userData == null) {
      fetchConnections();
    }
  }, []);
  return (
    <>
      {userData ? (
        <>
          <div className="flex flex-row flex-wrap w-full h-full gap-5">
            {userData?.map((userInfo) => {
              return (
                <div className="flex flex-row w-[28%] h-20 border-[1px] gap-4 p-2 rounded-2xl">
                  <div className="avatar">
                    <div className=" m-1 w-full rounded-full">
                      <img src={userInfo?.photoURL} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center ">
                    {userInfo?.firstName}
                    <div>
                      {userInfo?.company ? userInfo?.company : "Not Mentioned"}{" "}
                      |{" "}
                      {userInfo?.designation
                        ? userInfo?.designation
                        : "Not Mentioned"}
                    </div>
                  </div>
                  <div className="flex">
                    <button className="">
                      <KeyboardArrowDownIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h1>No connections found</h1>
        </>
      )}
      {/* <div className="w-1/3 h-24 border-[1px] rounded-xl"></div> */}
    </>
  );
};

export default Connections;
