import { useState } from "react";
import React from "react";
import { Avatar, Card } from "@mui/material";
import { openModal, closeModal } from "../../reduxSlice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Utils/Modal";
import NottificationModal from "./NottificationModal";
const mapActionType = (actionType) => {
  switch (actionType) {
    case "post":
      return "shared you a post: ";
  }
};
const NotificationComp = ({ Name, photo, actionType, content, postId }) => {
  const [modalKey, setModalKey] = useState("");
  const dispatch = useDispatch();
  const funcOnClicked = () => {
    console.log("on Click clicked post");
    setModalKey(postId);
    dispatch(openModal(postId));
  };
  return (
    <>
      <div
        className="flex w-full justify-start gap-3 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md bg-opacity-60 hover:cursor-pointer"
        onClick={() => funcOnClicked()}
      >
        <div className="flex gap-5 justify-center">
          <Avatar src={photo} />
        </div>
        <div className="flex flex-col w-full justify-center">
          <span className="font-semibold">
            {Name}{" "}
            <span className=" font-normal">{mapActionType(actionType)}</span>
          </span>
          <span
            className="text-gray-500"
            dangerouslySetInnerHTML={{
              __html: content?.contentText.slice(0, 200),
            }}
          ></span>
        </div>
      </div>
      {modalKey && (
        <Modal
          maxWidth={"md"}
          key="NotificationModal"
          uniqueKey={postId}
          closeOnOutsideClick={true}
          style={`rounded-md bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md bg-opacity-60 hover:cursor-pointer`}
        >
          <NottificationModal
            postId={postId}
            content={content}
            Name={Name}
            photo={photo}
            className=" "
          />
        </Modal>
      )}
    </>
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
