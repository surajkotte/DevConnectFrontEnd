import React from "react";

const NottificationModal = ({ postId, content, Name, photo }) => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md bg-opacity-60 items-center justify-center">
      <div className="flex items-center gap-3 p-2  justify-center">
        <img
          src={photo || "https://via.placeholder.com/48"}
          className="w-12 h-12 rounded-full border border-gray-500"
        />
        <div>
          <h1 className="text-xl font-bold text-cyan-400">{Name}</h1>
          <p className="text-sm text-gray-400">Software Engineer</p>
        </div>
      </div>
      <div className="flex p-2">
        <p className="text-gray-300 line-clamp-3 overflow-hidden transition-all">
          <div dangerouslySetInnerHTML={{ __html: content?.contentText }}></div>
        </p>
      </div>
      <div className="flex justify-center items-end">
        {content?.contentURL && (
          <img
            src={`${
              content?.contentURL
                ? content?.contentURL
                : "https://learning.sap-press.com/hs-fs/hubfs/image-png-Aug-29-2024-02-31-27-0426-PM.png?width=992&height=861&name=image-png-Aug-29-2024-02-31-27-0426-PM.png"
            }`}
            className="p-2 justify-center items-center"
            loading="lazy"
          ></img>
        )}
      </div>
      {/* <div className="flex justify-between text-gray-400 text-sm mt-3 border-t border-gray-700 pt-3">
        <div className="flex gap-2">
          <span>{actionClicked.likeCount} likes</span>
          <span>{actionClicked.dislikeCount} Dislikes</span>
        </div>
        <span>{actionClicked?.commentCount + " "} Comments</span>
      </div>
      <div className="flex justify-around py-3 border-t mt-3 border-gray-700">
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
        })} */}
    </div>
  );
};

export default NottificationModal;
