import React from "react";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { useDispatch } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState("");
  const ALLOWED_UPDATES = [
    "age",
    "photoURL",
    "firstName",
    "lastName",
    "about",
    "skills",
    "gender",
    "company",
    "designation",
  ];
  const handleSaveClick = async () => {
    const userData = profileInfo;
    console.log(userData);
    const newObject = {};
    Object.keys(userData).forEach((element) => {
      console.log(element);
      if (ALLOWED_UPDATES.includes(element)) {
        newObject[element] = userData[element];
      }
    });
    console.log(newObject);
    try {
      const res = await fetch("http://localhost:3000/profile/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newObject,
        }),
        credentials: "include",
      });
      const responseData = await res.json();
      if (
        responseData?.messageType == "S" ||
        responseData?.messageType == "E"
      ) {
        dispatch(
          addToast({
            message: responseData?.message,
            messageType: responseData?.messageType,
          })
        );
      }
      // setTimeout(() => {
      //   setError("");
      // }, 2000);
    } catch (err) {
      dispatch(
        addToast({
          message: err.message,
          messageType: "E",
        })
      );
    }
  };
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
    <>
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
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, firstName: e.target.value };
                  });
                }}
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
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, lastName: e.target.value };
                  });
                }}
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
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, age: e.target.value };
                  });
                }}
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
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, gender: e.target.value };
                  });
                }}
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
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, skills: e.target.value };
                  });
                }}
              />
            </label>
            <label className="form-control w-[44%]">
              <div className="label">
                <span className="label-text">Company</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full"
                value={profileInfo?.company}
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, company: e.target.value };
                  });
                }}
              />
            </label>
            <label className="form-control w-[44%]">
              <div className="label">
                <span className="label-text">Designation</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full"
                value={profileInfo?.designation}
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, designation: e.target.value };
                  });
                }}
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
                onChange={(e) => {
                  setProfileInfo((existingData) => {
                    return { ...existingData, about: e.target.value };
                  });
                }}
              ></textarea>
            </label>
            {/* <label className="form-control w-[90%]">
            <div className="label">
              <span className="label-text">Skill</span>
            </div>
            <textarea
              placeholder="Type here"
              className="textarea textarea-bordered textarea-accent w-full"
              rows="3"
            ></textarea>
          </label> */}
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
          <button
            className="btn btn-success btn-sm w-full"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
