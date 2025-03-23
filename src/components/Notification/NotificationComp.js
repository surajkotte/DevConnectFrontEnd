import React from "react";
import { Avatar, Card } from "@mui/material";
const mapActionType = (actionType) => {
  switch (actionType) {
    case "post":
      return "shared you a post: ";
  }
};
const NotificationComp = ({ Name, photo, actionType, content }) => {
  return (
    <div className="flex w-full justify-start gap-3">
      <div className="flex gap-5 justify-center items-center">
        <Avatar src={photo} />
      </div>
      <div className="flex flex-col w-full justify-center">
        <span className="font-semibold">
          {Name}{" "}
          <span className=" font-normal">{mapActionType(actionType)}</span>
        </span>
        <span
          className="text-gray-500"
          dangerouslySetInnerHTML={{ __html: content?.contentText }}
        ></span>
      </div>
    </div>
  );
};

export default NotificationComp;
// "post",
// "message",
// "request",
// "like",
// "comment",
// "reply",
// "follow",
