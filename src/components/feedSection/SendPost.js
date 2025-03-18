import React, { useEffect, useState } from "react";
import Modal from "../../Utils/Modal";
import { useSelector } from "react-redux";
import { addToast } from "../../reduxSlice/ToastSlice";
import { SendModal } from "./SendModal";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../reduxSlice/loaderSlice";
import { addToast } from "../../reduxSlice/ToastSlice";

const SendPost = ({ modalKey, setActionFalse, loginUserId }) => {
  const [connections, setConnections] = useState([]);
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const loader = useSelector((store) => store.loader);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      dispatch(showLoader());
      const data = await fetch("http://localhost:3000/user/connections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await data.json();
      if (responseData?.messageType == "S") {
        console.log(responseData?.data);
        setConnections(responseData?.data);
      }
    } catch (error) {
      addToast({ messageType: "E", message: error.message });
    } finally {
      dispatch(hideLoader());
    }
  };
  const sendPostsData = async () => {
    try {
      dispatch(showLoader());
      const feedId = modalKey.split("sendModal")[1];
      const response = await fetch(
        `http://localhost:3000/post/send/${feedId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: loginUserId,
            to: selectedConnections,
          }),
          credentials: "include",
        }
      );
      const responseData = await response.json();
      if (responseData?.messageType == "S") {
        dispatch(addToast({ messageType: "S", message: "Post Sent" }));
        const response = await fetch(
          `http://localhost:3000/post/send/notification/${feedId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: loginUserId,
              to: selectedConnections,
              actionType: "post",
            }),
            credentials: "include",
          }
        );
        const responseData = await response.json();
        if (responseData?.messageType == "S") {
          setActionFalse();
        }
      }
    } catch (error) {
      dispatch(addToast({ messageType: "E", message: error.message }));
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return !loader?.isLoading ? (
    <div>
      <Modal
        uniqueKey={modalKey}
        maxWidth={"sm"}
        closeOnOutsideClick={true}
        title={"Send Post"}
        onOutsideClick={setActionFalse}
      >
        {!loader?.isLoading && connections && connections?.length != 0 ? (
          <div className="flex flex-col gap-2">
            {connections.map((connection, index) => {
              return (
                <div key={index + "sendModal" + connection._id}>
                  <div className="w-full border-[1px] h-[1px]"></div>
                  <SendModal
                    key={index + "sendModal" + connection._id}
                    Name={connection?.firstName + " " + connection?.lastName}
                    photo={connection?.photoURL}
                    designation={connection?.designation}
                    selectedConnections={selectedConnections.find(
                      (item) => item == connection?._id
                    )}
                    setSelectedConnections={(flag) => {
                      if (flag) {
                        setSelectedConnections((prev) => [
                          ...prev,
                          connection._id,
                        ]);
                      } else {
                        setSelectedConnections((prev) =>
                          prev.filter((item) => item != connection._id)
                        );
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <h1 className="text-center text-2xl">No Connections Found</h1>
          </div>
        )}
        <div className="w-full border-[1px] h-[1px]"></div>
        <div className="flex justify-between gap-2 mt-3 w-full">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              if (!selectedAll) {
                connections.map((connection) => {
                  setSelectedConnections((prev) => [...prev, connection?._id]);
                });
              } else {
                setSelectedConnections([]);
              }
              setSelectedAll(!selectedAll);
            }}
          >
            {selectedAll ? "Deselect all" : "Select all"}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => sendPostsData()}
          >
            Send
          </Button>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default SendPost;
