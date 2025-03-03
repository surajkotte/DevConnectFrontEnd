import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../reduxSlice/modalSlice";
import { showLoader, hideLoader } from "../../reduxSlice/loaderSlice";
import { addToast } from "../../reduxSlice/ToastSlice";
export const MediaModals = ({ mediaType, updateFeedContent }) => {
  const [preview, setPreview] = useState("");
  const [infoObject, setInfoObject] = useState({ text: "", file: "" });
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setInfoObject((prev) => ({ ...prev, file: file }));
    }
  };
  const saveFile = async () => {
    try {
      dispatch(showLoader());
      const file = infoObject?.file;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user._id);
      formData.append("details", infoObject?.text);
      const res = await fetch("http://localhost:3000/aws/upload", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
        credentials: "include",
      });
      const responseData = await res.json();
      console.log(responseData);
      if (responseData.messageType == "S") {
        dispatch(addToast({ messageType: "S", message: "Upload Successful" }));
        dispatch(closeModal());
        updateFeedContent({
          _id: responseData?.data?._id,
          feedContent: responseData?.data?.feedContent,
          feedapi: { messageType: "S", data: null },
          userId: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            photoURL: user.photoURL,
          },
        });
      } else if (responseData.messageType == "E") {
        dispatch(
          addToast({ messageType: "E", message: responseData?.message })
        );
        dispatch(closeModal());
      }
    } catch (err) {
      dispatch(hideLoader());
      dispatch(addToast({ messageType: "E", message: "Upload Failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };
  return (
    <div className={`${preview ? "h-550[px]" : "h-[450px]"}`}>
      <div className="w-full h-full flex justify-center items-center overflow-y-auto">
        {!preview ? (
          <>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <CloudUploadIcon />
              <span>Upload File</span>
            </button>
          </>
        ) : (
          <div className="h-full flex flex-col">
            <div className=" flex h-[100px]">
              <textarea
                placeholder="Talk about this file.."
                name="Info"
                className="flex input input-bordered w-full h-[100px] max-h-[400px] border-blue-400"
                value={infoObject?.text}
                onChange={(event) => {
                  setInfoObject((prev) => ({
                    ...prev,
                    text: event.target.value,
                  }));
                }}
              />
            </div>
            <img src={preview} alt="Preview" className=" object-contain mt-2" />
          </div>
        )}
      </div>
      <div className="flex float-right gap-3 mt-2">
        <Button variant="contained" size="small" onClick={saveFile}>
          Save
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
