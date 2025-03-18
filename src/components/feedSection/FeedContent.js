import React, { useEffect } from "react";
import { useState } from "react";
import { SlLike, SlDislike, SlBubble, SlCursor } from "react-icons/sl";
import { CiFaceSmile } from "react-icons/ci";
import { Avatar, Badge, Space } from "antd";
import FeedComments from "./FeedComments";
import { Send } from "lucide-react";
import SendPost from "./SendPost";
import { useDispatch } from "react-redux";
import { openModal } from "../../reduxSlice/modalSlice";
const FeedContent = ({
  user,
  loginUser,
  feedObject,
  feedId,
  mediaType,
  feedEngagement,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const [actionClicked, setActionClicked] = useState({
    likeClicked: false,
    likeCount: 0,
    dislikeClicked: false,
    dislikeCount: 0,
    commentsClicked: false,
    commentCount: 0,
    sendClicked: false,
  });
  const [commentData, setCommentData] = useState("");
  const text = feedObject?.contentText;
  const mediaUrl = feedObject?.contentURL;
  const likeAction = async (action) => {
    try {
      const url = `http://localhost:3000/feed/${action}/${feedId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loginUser?._id, comments: commentText }),
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData?.messageType == "S" && action == "comment") {
        setCommentText("");
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    const isLikeClicked = feedEngagement?.data?.like.find(
      (info) => info.userId._id.toString() == loginUser?._id
    );
    const isDisLikeClicked = feedEngagement?.data?.dislike.find(
      (info) => info.userId._id.toString() == loginUser?._id
    );
    setActionClicked((prev) => ({
      ...prev,
      likeCount: feedEngagement?.data ? feedEngagement?.data?.likeCount : 0,
      dislikeCount: feedEngagement?.data
        ? feedEngagement?.data?.dislikeCount
        : 0,
      commentCount: feedEngagement?.data
        ? feedEngagement?.data?.commentCount
        : 0,
      likeClicked: isLikeClicked ? true : false,
      dislikeClicked: isDisLikeClicked ? true : false,
    }));
    const commentsData = feedEngagement?.data?.comments?.map((commentInfo) => {
      return {
        comment: {
          commentText: commentInfo?.comment?.commentText,
          createdTime: commentInfo?.comment?.createdAt,
          userId: commentInfo?.comment?.userId,
        },
        reply: commentInfo?.reply,
      };
    });
    setCommentData(commentsData);
  }, [feedObject, feedId, feedEngagement]);
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
            isExpanded
              ? ""
              : `${
                  mediaType == "Image" || mediaType == "Video"
                    ? "line-clamp-3 overflow-hidden"
                    : ""
                }`
          } transition-all`}
        >
          {mediaType == "Image" || mediaType == "Video" ? (
            <>
              {isExpanded ? text : `${text?.slice(0, 200)}... `}
              {!isExpanded && text?.length > 200 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-500 hover:underline inline"
                >
                  Read More
                </button>
              )}
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
          )}
        </p>
      </div>
      <div className="flex">
        {mediaType == "Image" ? (
          <img
            src={`${
              mediaUrl
                ? mediaUrl
                : "https://learning.sap-press.com/hs-fs/hubfs/image-png-Aug-29-2024-02-31-27-0426-PM.png?width=992&height=861&name=image-png-Aug-29-2024-02-31-27-0426-PM.png"
            }`}
            className="p-2"
            loading="lazy"
          ></img>
        ) : mediaType == "Video" ? (
          <video
            src={`${
              mediaUrl
                ? mediaUrl
                : "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample"
            }`}
            className="p-2"
            controls
          ></video>
        ) : null}
      </div>
      <div className="flex justify-between p-4 text-sm text-gray-600 border-t border-gray-200">
        <div className="flex gap-2">
          <span>{actionClicked.likeCount} likes</span>
          <span>{actionClicked.dislikeCount} Dislikes</span>
        </div>
        <span>{actionClicked?.commentCount + " "} Comments</span>
      </div>
      <div className="flex justify-around py-3 border-t border-gray-200">
        <button
          onClick={() => {
            setActionClicked((prev) => ({
              ...prev,
              likeCount:
                prev.likeClicked && prev.likeCount != 0
                  ? prev.likeCount - 1
                  : prev.likeCount + 1,
              likeClicked: !prev.likeClicked,
              dislikeCount:
                prev.dislikeClicked && prev.dislikeCount != 0
                  ? prev.dislikeCount - 1
                  : prev.dislikeCount,
              dislikeClicked: false,
            }));
            likeAction("like");
          }}
        >
          {actionClicked?.likeClicked ? (
            <SlLike className=" text-blue-500 h-5 w-5" />
          ) : (
            <SlLike className=" hover:text-blue-500 h-5 w-5" />
          )}
        </button>
        <button
          onClick={() => {
            setActionClicked((prev) => ({
              ...prev,
              likeCount:
                prev.likeClicked && prev.likeCount != 0
                  ? prev.likeCount - 1
                  : prev?.likeCount,
              likeClicked: false,
              dislikeCount:
                prev.dislikeClicked == false
                  ? prev?.dislikeCount + 1
                  : prev.dislikeCount - 1,
              dislikeClicked: !prev.dislikeClicked,
            }));
            likeAction("dislike");
          }}
        >
          {actionClicked?.dislikeClicked ? (
            <SlDislike className="text-red-500 h-5 w-5" />
          ) : (
            <SlDislike className=" hover:text-red-500 h-5 w-5" />
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
          <SlBubble className=" hover:text-blue-500 h-5 w-5" />
        </button>
        <button
          onClick={() => {
            dispatch(openModal(`sendModal${feedId}`));
            setActionClicked((prev) => ({
              ...prev,
              sendClicked: !prev.sendClicked,
            }));
          }}
        >
          <SlCursor className=" hover:text-blue-500 h-5 w-5" />
        </button>
      </div>
      <div className={`w-full flex flex-col justify-center items-center`}>
        {actionClicked?.commentsClicked && (
          <>
            <div
              className={`w-[90%] ${
                commentText ? "flex-col" : "flex"
              } justify-center items-center transition-all border-blue-400 mb-2 outline-2 border-[2px] rounded-3xl p-2 max-h-96`}
            >
              <input
                type="text"
                placeholder="Type here"
                className="min-h-10 w-full outline-none"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex items-center justify-between gap-2">
                <button>
                  <CiFaceSmile size={"28px"} />
                </button>
                {commentText && (
                  <button
                    className="btn btn-sm btn-primary"
                    size={"small"}
                    onClick={() => {
                      setActionClicked((prev) => ({
                        ...prev,
                        commentCount: prev?.commentCount + 1,
                      }));
                      setCommentData((prev = []) => [
                        ...prev,
                        {
                          comment: {
                            commentText: commentText,
                            createdTime: new Date(),
                            userId: {
                              _id: loginUser?._id,
                              firstName: loginUser?.firstName,
                              lastName: loginUser?.lastName,
                              photoURL: loginUser?.photoURL,
                            },
                          },
                          reply: [],
                        },
                      ]);
                      likeAction("comment");
                    }}
                  >
                    comment
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {actionClicked?.commentsClicked &&
        commentData &&
        commentData.length != 0 &&
        commentData?.map((data, index) => {
          {
            return (
              <div className="p-2" key={index + " commentsInfo"}>
                <FeedComments
                  key={index + "feedComments" + data?.id}
                  commentInfo={data?.comment}
                />
              </div>
            );
          }
        })}
      {actionClicked?.sendClicked && (
        <SendPost
          modalKey={`sendModal${feedId}`}
          key={feedId}
          loginUserId={user?._id}
          setActionFalse={() => {
            setActionClicked((prev) => ({
              ...prev,
              sendClicked: false,
            }));
          }}
        />
      )}
    </div>
  );
};

export default FeedContent;
