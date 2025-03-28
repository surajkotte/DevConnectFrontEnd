import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageScreen from "./MessageScreen";
import { Card } from "@mui/material";
import { Video, Phone, Image, Pin } from "lucide-react";
const ChatUsers = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const fetchUsers = async (req, res) => {
    try {
      const userDetails = await fetch(
        "http://localhost:3000/user/connections",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const details = await userDetails.json();
      setUserInfo(details.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex w-[95%] h-[85%] max-h-[725px] border-[1px] rounded-2xl shadow-2xl overflow-hidden ">
      <div className="flex flex-col w-1/3 border-[1px] h-full items-start rounded-2xl rounded-tr-[0px] rounded-br-[0px] overflow-hidden">
        <div className="flex justify-between items-center w-full h-16 p-4">
          <span className="flex font-semibold text-xl">Chats</span>
          <div className="flex">
            <button>
              <ChatBubbleOutlineIcon />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full font-semibold h-16 p-2">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="w-full flex flex-col h-[calc(100%-128px)] p-2 gap-3 overflow-y-auto">
          {userInfo && userInfo.length > 0 ? (
            userInfo.map((info, index) => {
              return (
                <button
                  key={info?._id}
                  onClick={() => {
                    console.log("selected");
                    setSelectedUser({ info });
                  }}
                  className="w-full"
                >
                  <UserCard
                    profileURL={info.photoURL}
                    name={info.firstName + " " + info.lastName}
                    // key={info?._id + index}
                  />
                </button>
              );
            })
          ) : (
            <span className=" font-semibold flex w-full h-full justify-center items-center">
              No data found
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full h-full flex-col">
        {selectedUser ? (
          <MessageScreen userData={selectedUser} />
        ) : (
          <span className="w-full h-full flex justify-center items-center">
            Select a user
          </span>
        )}
      </div>
      {selectedUser && (
        <div className="flex ">
          <div className="max-w-sm bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 backdrop-blur-md bg-opacity-60 rounded-2xl p-6 text-white shadow-lg">
            {/* User Info */}
            <div className="flex flex-col items-center">
              <img
                src={selectedUser?.info?.photoURL}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-2 border-gray-500"
              />
              <h2 className="text-xl font-semibold mt-3">
                {selectedUser?.info?.firstName +
                  " " +
                  selectedUser?.info?.lastName}
              </h2>
              <p className="text-gray-400 text-sm">
                {selectedUser?.info?.designation}
              </p>
            </div>
            <div className="flex justify-around mt-6 gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition">
                <Phone size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition">
                <Video size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition">
                <Pin size={20} />
              </button>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Media</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Image size={24} />
                </div>
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Image size={24} />
                </div>
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Image size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatUsers;
