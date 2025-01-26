import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";
import AccordionDown from "../images/AccordionDropDown.png";
import AccordionUp from "../images/AccordionDropUp.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";
import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";

const UserConnectionInfo = ({ userInfo, isOpen, toggleAccordion }) => {
  return (
    <div className="flex flex-col sm:w-[48%] lg:w-[30%] border-[1px] rounded-2xl p-4 gap-4">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className=" m-1 w-16 h-16 rounded-full">
            <img src={userInfo?.photoURL} />
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-medium">{userInfo?.firstName}</span>
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
const Connections = () => {
  const [userData, setUserData] = useState("");
  const [accOpenIndex, setAccOpenIndex] = useState("");
  const dispatch = useDispatch();
  const fetchConnections = async (req, res) => {
    if (userData) return;
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
      console.log(responseData);
      if (responseData.messageType == "E") {
        dispatch(
          addToast({
            messageType: responseData.messageType,
            message: responseData?.message,
          })
        );
      } else {
        if (responseData?.data?.length != 0) {
          setUserData(responseData?.data);
        }
        responseData?.data;
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
  useEffect(() => {
    if (!userData) {
      fetchConnections();
    }
  }, [userData]);
  return (
    <>
      {userData ? (
        <>
          <div className="p-4 flex flex-wrap gap-4 ">
            {/* <div className="flex flex-wrap w-full h-full items-center m-auto gap-3 overflow-scroll"> */}
            {userData?.map((userInfo, index) => {
              return (
                <UserConnectionInfo
                  userInfo={userInfo}
                  key={userInfo?._id}
                  className=" overflow-y-auto"
                  isOpen={accOpenIndex == userInfo?._id}
                  toggleAccordion={setAccOpenIndex}
                />
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

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToast } from "../reduxSlice/ToastSlice";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";

// const UserConnectionInfo = ({ userInfo, isOpen, toggleAccordion }) => {
//   return (
//     <div className="flex flex-col border-[1px] rounded-2xl p-4 gap-4">
//       <div className="flex items-center gap-4 w-1/3">
//         <div className="avatar w-16 h-16 rounded-full overflow-hidden">
//           <img
//             src={userInfo?.photoURL}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="flex flex-col justify-center">
//           <span className="font-medium text-lg">{userInfo?.firstName}</span>
//           <span className="text-gray-500 text-sm">
//             {userInfo?.company || "Not Mentioned"} |{" "}
//             {userInfo?.designation || "Not Mentioned"}
//           </span>
//         </div>
//         <button
//           className="ml-auto"
//           onClick={() => toggleAccordion(userInfo?._id)}
//         >
//           {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="mt-4 text-sm text-gray-600">
//           <p>
//             <strong>Email:</strong> {userInfo?.email || "Not Mentioned"}
//           </p>
//           <p>
//             <strong>Phone:</strong> {userInfo?.phone || "Not Mentioned"}
//           </p>
//           <p>
//             <strong>Location:</strong> {userInfo?.location || "Not Mentioned"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// const Connections = () => {
//   const [userData, setUserData] = useState([]);
//   const [openAccIndex, setOpenAccIndex] = useState(null);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       dispatch(showLoader());
//       const response = await fetch("http://localhost:3000/user/allUsers", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       const responseData = await response.json();
//       console.log(responseData);
//       if (responseData.messageType === "E") {
//         dispatch(
//           addToast({
//             messageType: responseData.messageType,
//             message: responseData.message,
//           })
//         );
//       } else {
//         setUserData(responseData?.data || []);
//       }
//     } catch (err) {
//       dispatch(
//         addToast({
//           messageType: "E",
//           message: err.message,
//         })
//       );
//     } finally {
//       dispatch(hideLoader());
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   const toggleAccordion = (id) => {
//     setOpenAccIndex((prevIndex) => (prevIndex === id ? null : id));
//   };

//   return (
//     <div className="p-4 flex flex-wrap gap-4 w-full">
//       {userData.length > 0 ? (
//         userData.map((userInfo, index) => (
//           <UserConnectionInfo
//             key={userInfo?._id}
//             userInfo={userInfo}
//             isOpen={openAccIndex === userInfo?._id}
//             toggleAccordion={setOpenAccIndex}
//           />
//         ))
//       ) : (
//         <h1 className="text-center w-full text-gray-500">
//           No connections found
//         </h1>
//       )}
//     </div>
//   );
// };

// export default Connections;
