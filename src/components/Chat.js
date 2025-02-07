import React from "react";
import ChatUsers from "./chatSection/ChatUsers";
import MessageScreen from "./chatSection/MessageScreen";
const Chat = () => {
  return (
    <div className="w-full h-full justify-center flex items-center">
      <ChatUsers />
    </div>
  );
};

export default Chat;
