import React, { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../reduxSlice/ToastSlice";
import createSocket from "../../Utils/socket";
import socket from "../../Utils/socket";
const MessageScreen = ({ userData }) => {
  const [messagesData, setMessagesData] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { photoURL, firstName, lastName, connectionId, _id } = userData?.info;
  const fetchChat = async () => {
    const url = `${"http://localhost:3000/getMessages/"}${connectionId}`;
    const messages = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const messageDetails = await messages.json();
    setMessagesData(messageDetails?.data?.messages);
  };
  const onSendClick = async () => {
    // const messageObject = {
    // from: user?._id,
    // to: _id,
    // message: inputMessage,
    // };
    // try {
    //   const messageRes = await fetch(
    //     `${"http://localhost:3000/sendMessage/"}${connectionId}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         ...messageObject,
    //       }),
    //       credentials: "include",
    //     }
    //   );
    //   const messageResponse = await messageRes.json();
    //   dispatch(addToast({ messageType: "S", message: "Sent Successfully" }));
    //   setInputMessage("");
    // } catch (err) {
    //   dispatch(addToast({ messageType: "E", message: err.message }));
    // }
    const socket = createSocket();
    socket.emit("sendMessage", {
      from: user?._id,
      to: _id,
      message: inputMessage,
      connectionId,
    });
    setInputMessage("");
  };
  useEffect(() => {
    const socket = createSocket();
    socket.emit("startConnection", { firstName, lastName, connectionId });
    socket.on("messageReceived", ({ latestMessage }) => {
      console.log(latestMessage);
      if (messagesData.length > 0) {
        setMessagesData((prevMessage) => [...prevMessage, latestMessage]);
      } else {
        setMessagesData([latestMessage]);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [connectionId]);
  useEffect(() => {
    setMessagesData([]);
    fetchChat();
  }, [userData]);
  return (
    <div className="flex flex-col w-full h-full gap-2 max-h-[726px]">
      <div className="flex w-full h-20 justify-center gap-4 border-b-[1px]">
        <div className="flex avatar justify-center items-center p-3">
          <div className="ring-4 ring-primary ring-offset-2 ring-offset-base-100 w-16 h-16 rounded-full overflow-hidden transform transition-all ">
            <img
              src={
                photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt={`AB`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full h-full items-center flex">
          <span className="font-semibold">{firstName + " " + lastName}</span>
        </div>
      </div>
      <div className="flex w-full h-full overflow-y-auto flex-col">
        {messagesData && messagesData.length != 0 ? (
          <div className=" w-full h-full">
            {messagesData.map((data, index) => {
              return (
                <div key={data?._id}>
                  {data?.from === user?._id ? (
                    <ChatBubble
                      key={data?._id + "" + index}
                      message={data?.message}
                      timeStamp={data?.createdAt}
                      chatStatus={"chat-end"}
                    />
                  ) : (
                    <ChatBubble
                      key={data?._id + "" + index}
                      message={data?.message}
                      timeStamp={data?.createdAt}
                      chatStatus={"chat-start"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <span className="flex w-full h-full justify-center items-center font-semibold">
            No chat found
          </span>
        )}
      </div>
      <div className="flex w-full h-20 justify-center items-center">
        <div className="w-full h-full justify-center items-center flex rounded-full">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-[85%] rounded-2xl"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
          />
          <button
            className=" w-10 h-10 ml-4 border-[1px] rounded-full flex items-center justify-center"
            onClick={() => onSendClick()}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageScreen;
