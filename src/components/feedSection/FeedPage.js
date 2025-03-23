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
import TextModal from "./TextModal";
import { openModal } from "../../reduxSlice/modalSlice";
import FeedContent from "./FeedContent";

const FeedPage = ({ user }) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [feedData, setFeedData] = useState("");
  const loader = useSelector((store) => store.loader);
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
    setSelectedAction(event);
    dispatch(openModal(event));
  };
  const fetchFeedContent = async () => {
    try {
      dispatch(showLoader());
      const responseData = await multiApiCalls([
        "http://localhost:3000/aws/getFeed",
        "http://localhost:3000/feed/countInfo",
      ]);
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
  const updateFeed = (data) => {
    setFeedData((prev) => [data, ...prev]);
  };
  useEffect(() => {
    fetchFeedContent();
  }, [user]);
  return (
    <div className="flex flex-col items-center w-full h-full gap-5 overflow-y-auto max-h-screen bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 backdrop-blur-md bg-opacity-60">
      <Card
        className="w-full max-w-xl p-4 border shadow-lg rounded-xl mt-2"
        style={{
          minHeight: "130px",
          background: "linear-gradient(to right, #111827, #1f2937)",
          border: "1px solid #374151",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(17, 24, 39, 0.6)",
        }}
      >
        <div className="flex items-center gap-3 ">
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
            uniqueKey={selectedAction}
            closeOnOutsideClick={true}
          >
            {selectedAction == "Image" || selectedAction == "Video" ? (
              <MediaModals
                mediaType={selectedAction}
                updateFeedContent={updateFeed}
                className="bg-gray-700"
              />
            ) : (
              <TextModal
                mediaType={selectedAction}
                updateFeedContent={updateFeed}
              />
            )}
          </Modal>
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
            // onClick={() => document.getElementById("fileInput").click()}
            onClick={() => handleModal("Image")}
          >
            <SlCamera className="h-5 w-5" />
            <span>Photo</span>
          </button>
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-green-500"
            onClick={() => handleModal("Video")}
          >
            {/* <VideocamOutlined /> */}
            <SlCamrecorder className="h-5 w-5" />
            <span>Video</span>
          </button>
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-purple-500"
            onClick={() => handleModal("Project")}
          >
            {/* <AccountTreeOutlined /> */}
            <SlOrganization className="h-5 w-5" />
            <span>Project</span>
          </button>
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
            onClick={() => handleModal("Article")}
          >
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
              {console.log(data)}
              <FeedContent
                user={data.userId}
                loginUser={user}
                feedObject={data.feedContent}
                feedId={data?._id}
                mediaType={data?.mediaType}
                feedEngagement={data?.feedapi}
                key={data._id}
              />
            </>
          );
        })
      ) : !loader.isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          No Feed available
        </div>
      ) : null}
    </div>
  );
};

export default FeedPage;
