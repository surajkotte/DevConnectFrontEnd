import React from "react";
import { Avatar } from "@mui/material";
const NotificationComp = ({ Name, photo, actionType }) => {
  return (
    <div className="flex w-full justify-start gap-3">
      <div className="flex gap-5 justify-center items-center">
        <Avatar src={photo} />
      </div>
      <div className="flex flex-col w-full justify-center">
        <span className="font-semibold">{Name}</span>
        <span className="text-gray-500">Liked your post</span>
      </div>
    </div>
  );
};

export default NotificationComp;
