import React from "react";

const FeedComments = ({ commentInfo }) => {
  return (
    <div className="flex gap-1">
      {console.log(commentInfo)}
      <div className=" w-[35px] h-[35px] avatar flex justify-center">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={commentInfo?.userId?.photoURL}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex">
          <span className=" font-semibold">
            {commentInfo?.userId?.firstName +
              " " +
              commentInfo?.userId?.lastName}
          </span>
        </div>
        <span>{commentInfo?.commentText}</span>
      </div>
    </div>
  );
};

export default FeedComments;
