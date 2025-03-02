import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../reduxSlice/loaderSlice";
import {
  PhotoCameraOutlined,
  VideocamOutlined,
  AccountTreeOutlined,
  ArticleOutlined,
} from "@mui/icons-material";
import multiApiCalls from "../../Utils/multiApiCalls";
import { SlCamera, SlCamrecorder, SlOrganization } from "react-icons/sl";
import { PiArticleLight } from "react-icons/pi";
import { addToast } from "../../reduxSlice/ToastSlice";
import Modal from "../../Utils/Modal";
import { MediaModals } from "./MediaModals";
import { openModal } from "../../reduxSlice/modalSlice";
import FeedContent from "./FeedContent";

const FeedPage = ({ user }) => {
  const [preview, setPreview] = useState("");
  const [feedData, setFeedData] = useState("");
  const buttonsArray = [
    {
      name: "Photo",
      icon: <PhotoCameraOutlined />,
    },
    {
      name: "Video",
      icon: <VideocamOutlined />,
    },
    {
      name: "Project",
      icon: <AccountTreeOutlined />,
    },
    { name: "Article", icon: <ArticleOutlined /> },
  ];
  const dispatch = useDispatch();
  const handleModal = (event) => {
    dispatch(openModal("Image"));
  };
  const fetchFeedContent = async () => {
    try {
      dispatch(showLoader());
      const responseData = await multiApiCalls([
        "http://localhost:3000/aws/getFeed",
        "http://localhost:3000/feed/countInfo",
      ]);
      console.log(responseData);
      // const data = await fetch("http://localhost:3000/aws/getFeed", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      // });
      // const responseData = await data.json();
      if (responseData.messageType == "S") {
        setFeedData(responseData.data);
      } else if (responseData.messageType == "E") {
        dispatch(addToast({ messageType: "E", message: responseData.message }));
      }
    } catch (err) {
      dispatch(addToast({ messageType: "E", message: err.message }));
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    fetchFeedContent();
  }, []);
  return (
    <div
      className="flex flex-col items-center w-full h-full gap-5 overflow-y-auto max-h-screen"
      key={user?._id}
    >
      <Card
        className="w-full max-w-xl p-4 bg-white border border-gray-300 shadow-lg rounded-xl mt-2"
        style={{ minHeight: "130px" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              className="w-full h-full object-cover"
            />
          </div>

          <input
            type="text"
            placeholder="Create post"
            className="w-full h-10 px-4 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-around mt-2 border-t border-gray-200 pt-3">
          <Modal
            maxWidth={"md"}
            key="Education"
            uniqueKey={"Image"}
            closeOnOutsideClick={true}
          >
            <MediaModals mediaType={"Image"} />
          </Modal>
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
            // onClick={() => document.getElementById("fileInput").click()}
            onClick={() => handleModal()}
          >
            <SlCamera className="h-5 w-5" />
            <span>Photo</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
            {/* <VideocamOutlined /> */}
            <SlCamrecorder className="h-5 w-5" />
            <span>Video</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-purple-500">
            {/* <AccountTreeOutlined /> */}
            <SlOrganization className="h-5 w-5" />
            <span>Project</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
            {/* <ArticleOutlined /> */}
            <PiArticleLight className="h-5 w-5" />
            <span>Article</span>
          </button>
        </div>
      </Card>
      {/* <div className="w-full max-w-xl bg-white border border-gray-300 rounded-xl shadow-lg">
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
            {!isExpanded && (
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
            src={
              "https://learning.sap-press.com/hs-fs/hubfs/image-png-Aug-29-2024-02-31-27-0426-PM.png?width=992&height=861&name=image-png-Aug-29-2024-02-31-27-0426-PM.png"
            }
          ></img>
        </div>
      </div> */}
      {feedData && feedData.length != 0 ? (
        feedData.map((data, index) => {
          return (
            <>
              <FeedContent
                user={data.userId}
                loginUser={user}
                feedObject={data.feedContent}
                feedId={data?._id}
                feedEngagement={data?.feedapi}
                key={data._id}
              />
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedPage;
