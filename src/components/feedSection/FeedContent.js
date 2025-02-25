import React, { useEffect } from "react";
import { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
const FeedContent = ({ user, feedObject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [actionClicked, setActionClicked] = useState({
    likeClicked: false,
    dislikeClicked: false,
    commentsClicked: false,
    sendClicked: false,
  });
  const text = feedObject?.contentText;
  const mediaUrl = feedObject?.contentURL;
  const likeAction = async (action) => {
    console.log(feedObject);
    try {
      const url = `http://localhost:3000/feed/${action}/${feedObject?._id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id }),
        credentials: "include",
      });
    } catch (err) {}
  };
  return (
    <div className="w-full max-w-xl bg-white border border-gray-300 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 p-2 ">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={
              user?.photoURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="font-medium">{"Software Engineer"}</p>
        </div>
      </div>
      <div className="flex p-2">
        <p
          className={`text-gray-700 ${
            isExpanded ? "" : "line-clamp-3 overflow-hidden"
          } transition-all`}
        >
          {isExpanded ? text : `${text.slice(0, 200)}... `}
          {!isExpanded && text.length > 200 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-500 hover:underline inline"
            >
              Read More
            </button>
          )}
        </p>
      </div>
      <div className="flex">
        <img
          src={`${
            mediaUrl
              ? mediaUrl
              : "https://learning.sap-press.com/hs-fs/hubfs/image-png-Aug-29-2024-02-31-27-0426-PM.png?width=992&height=861&name=image-png-Aug-29-2024-02-31-27-0426-PM.png"
          }`}
          className="p-2"
        ></img>
      </div>
      <div className="w-full border-[1px]"></div>
      <div className="flex justify-around h-11">
        <button
          onClick={() => {
            setActionClicked((prev) => ({
              ...prev,
              likeClicked: !prev.likeClicked,
            }));
            likeAction("like");
          }}
        >
          {actionClicked?.likeClicked ? (
            <ThumbUpIcon className=" text-blue-500" />
          ) : (
            <ThumbUpOutlinedIcon className=" hover:text-blue-500" />
          )}
        </button>
        <button
          onClick={() => {
            setActionClicked((prev) => ({
              ...prev,
              dislikeClicked: !prev.dislikeClicked,
            }));
            likeAction("dislike");
          }}
        >
          {actionClicked?.dislikeClicked ? (
            <ThumbDownIcon />
          ) : (
            <ThumbDownOutlinedIcon className=" hover:text-blue-500" />
          )}
        </button>
        <button
          onClick={() => {
            setActionClicked((prev) => ({
              ...prev,
              commentsClicked: !prev.commentsClicked,
            }));
          }}
        >
          <CommentOutlinedIcon className=" hover:text-blue-500" />
        </button>
        <button
          onClick={() => {
            setActionClicked((prev) => ({
              ...prev,
              sendClicked: !prev.sendClicked,
            }));
          }}
        >
          <SendOutlinedIcon className=" hover:text-blue-500" />
        </button>
      </div>
    </div>
  );
};

export default FeedContent;
