import React from "react";

export const ChatBubble = ({ message, chatStatus, timeStamp }) => {
  const convertTime = (date) => {
    if (!date) return "";
    const Date1 = new Date(date);
    const year = Date1.getFullYear();
    const month = String(Date1.getMonth() + 1).padStart(2, "0");
    const day = String(Date1.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };
  const getTime = (date) => {
    if (!date) return "";
    const Date1 = new Date(date);
    const Hours = Date1.getHours();
    const Minutes = Date1.getMinutes();
    return `${Hours}:${Minutes}`;
  };
  return (
    <div className={"chat " + chatStatus}>
      <div className="chat-header">
        <time className="text-xs opacity-50">{convertTime(timeStamp)}</time>
      </div>
      <div className="chat-bubble break-words whitespace-pre-wrap max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        {message}
      </div>
      <div className="chat-footer opacity-50">{getTime(timeStamp)}</div>
    </div>
  );
};
