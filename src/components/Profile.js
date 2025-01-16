import React from "react";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState("");
  const getProfile = async () => {
    const res = await fetch("http://localhost:3000/profile/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await res.json();
    //dispatch(hideLoader());
    console.log(responseData);
    if (responseData?.messageType == "S") {
      setProfileInfo(responseData?.data);
    } else {
    }
  };
  useEffect(() => {
    if (!profileInfo) {
      //dispatch(showLoader());
      getProfile();
    }
  }, []);
  return (
    <div className="w-3/4 h-3/4 flex border-[1px] rounded-xl justify-center items-center shadow-lg border-slate-600 overflow-auto">
      <div className="flex w-full h-full flex-wrap justify-center items-start mt-4">
        <h1 className=" font-bold text-2xl w-full justify-center items-center flex ">
          Profile Information
        </h1>
        <div className=" flex justify-center items-center w-full flex-wrap gap-3">
          <label className="form-control w-[44%]">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={profileInfo?.firstName}
            />
          </label>

          <label className="form-control w-[44%]">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={profileInfo?.lastName}
            />
          </label>

          <label className="form-control w-[44%]">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={profileInfo?.emailId}
            />
          </label>

          <label className="form-control w-[44%]">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={profileInfo?.age}
            />
          </label>

          <label className="form-control w-[44%]">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={profileInfo?.gender}
            />
          </label>

          <label className="form-control w-[44%]">
            <div className="label">
              <span className="label-text">Skills</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full"
              value={profileInfo?.skills}
            />
          </label>

          <label className="form-control w-[90%]">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <textarea
              placeholder="Type here"
              className="textarea textarea-bordered textarea-accent w-full"
              rows="3"
              value={profileInfo?.about}
            ></textarea>
          </label>
          <label className="form-control w-[90%]">
            <div className="label">
              <span className="label-text">Skill</span>
            </div>
            <textarea
              placeholder="Type here"
              className="textarea textarea-bordered textarea-accent w-full"
              rows="3"
            ></textarea>
          </label>
        </div>
      </div>
      <div className="flex w-36 flex-col flex-wrap justify-center items-center gap-3">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img
              src={
                profileInfo.photoURL
                  ? profileInfo.photoURL
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
        <button className="btn btn-primary btn-sm">Change profile</button>
        <button className="btn btn-success btn-sm w-full">Save</button>
      </div>
    </div>
  );
};

export default Profile;
