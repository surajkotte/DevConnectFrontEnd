import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import {
  AddCircleOutlineOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
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
    <div className="flex flex-col border-[1px] w-full rounded-2xl p-4 gap-4 self-start min-w-0">
      <div className="flex items-center gap-4 w-full">
        <div className="avatar">
          <div className="m-1 w-16 h-16 rounded-full">
            <img src={userInfo?.photoURL} alt="Avatar" />
          </div>
        </div>

        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between">
            <span className="font-medium">{userInfo?.firstName}</span>
            <button onClick={() => connectionClicked(userInfo?._id)}>
              {false ? <CheckCircleOutline /> : <AddCircleOutlineOutlined />}
            </button>
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
        <div className="flex flex-col gap-2 w-full overflow-hidden transition-all duration-300 p-3 rounded-lg max-h-40 overflow-y-auto">
          {/* About Section */}
          {userInfo?.about && (
            <div>
              <h3 className="font-semibold text-gray-700">About</h3>
              <p className="text-gray-600 text-sm">{userInfo.about}</p>
            </div>
          )}

          {/* Skills Section */}
          {userInfo?.skills?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
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
    <div className="grow w-full h-full shadow rounded overflow-y-auto">
      {userData?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full p-3 max-w-[95%] m-auto">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {userData?.map((userInfo, index) => {
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
    // <div className="p-2 flex flex-wrap gap-4 justify-between min-h-full max-h-full">
    //   {userData.length > 0 ? (
    //     <div className=" w-1/2 flex flex-col gap-3">
    //       {userData.map((userInfo) => {
    //         <UserConnectionInfo
    //           key={userInfo._id}
    //           userInfo={userInfo}
    //           isOpen={accOpenIndex === userInfo._id}
    //           toggleAccordion={toggleAccordion}
    //         />;
    //       })}
    //     </div>
    //   ) : (
    //     <h1>No connections found</h1>
    //   )}
    // </div>
  );
};

export default MyConnection;
