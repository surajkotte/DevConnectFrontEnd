import React, { useEffect, useState } from "react";
import NotificationComp from "./Notification/NotificationComp";
import { useSelector, useDispatch } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";
import { message } from "antd";

const Notifications = () => {
  const user = useSelector((store) => store.user);
  const notificationLoading = useSelector((store) => store.loader);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const fetchNotifications = async () => {
    try {
      const url = `http://localhost:3000/post/get/notifications/${user?._id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData?.messageType == "S") {
        console.log(responseData?.data);
        setData(responseData?.data);
      }
    } catch (err) {
      dispatch(addToast({ messageType: "E", message: err.message }));
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return !notificationLoading.isLoading ? (
    <div className="w-[70%] flex flex-col h-full gap-5">
      {console.log(data)}
      {data && data.length != 0 ? (
        data.notifications.map((element) => {
          return (
            <NotificationComp
              Name={element?.from?.firstName + " " + element?.from?.lastName}
              photo={element?.from?.photoURL}
              actionType={element?.actionType}
              isRead={element?.isRead}
              content={element?.post?.feedContent}
            />
          );
        })
      ) : !notificationLoading.isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          No notifications found
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Notifications;
