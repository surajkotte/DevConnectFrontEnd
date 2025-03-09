import React, { useRef, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import JoditReact from "jodit-react";
import { closeModal } from "../../reduxSlice/modalSlice";
import { addToast } from "../../reduxSlice/ToastSlice";
const TextModal = ({ mediaType, updateFeedContent }) => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const user = useSelector((store) => store.user);
  const handleSaveClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/content/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          contentText: content,
          mediaType: mediaType,
        }),
        credentials: "include",
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.messageType == "S") {
        dispatch(addToast({ messageType: "S", message: "Upload Successful" }));
        dispatch(closeModal());
        updateFeedContent({
          _id: responseData?.data?._id,
          feedContent: responseData?.data?.feedContent,
          mediaType: mediaType,
          feedapi: { messageType: "S", data: null },
          userId: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            photoURL: user.photoURL,
          },
        });
      }
    } catch (err) {}
  };
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    readonly: false,
    autofocus: true,
    tabIndex: 1,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",
    placeholder: "Write something awesome ...",
    beautyHTML: true,
    toolbarButtonSize: "large",
    height: "450px",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "video",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    //   extraButtons: ["uploadImage", "codeBlock"],
  }));
  return (
    <div className="h-[500px] flex flex-col">
      <JoditReact
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
      <div className="flex justify-end items-center gap-2 mt-2">
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => handleSaveClick()}
        >
          <span>Save</span>
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => dispatch(closeModal())}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default TextModal;
