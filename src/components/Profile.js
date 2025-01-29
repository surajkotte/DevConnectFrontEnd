import React from "react";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";
import Select from "react-select";
import { itRoles, skills } from "../staticdata/rolls_skills";
import makeAnimated from "react-select/animated";

const Profile = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");
  const loader = useSelector((store) => store.loader);
  const animatedComponents = makeAnimated();
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
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "inherit", // Background inherits from the parent container
      //borderColor: "#2d3748", // Adjust border color to match
      //color: "#fff", // Text color
    }),
    menu: (provided) => ({
      ...provided,
      //backgroundColor: "inherit", // Menu background inherits from the parent container
      color: "black", // Text color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#2d3748" : "inherit", // Highlight selected option
      //color: "#fff", // Option text color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // Color of the selected value
    }),
  };
  const handleSaveClick = async () => {
    const userData = profileInfo;
    userData;
    const newObject = {};
    console.log(userData);
    Object.keys(userData).forEach((element) => {
      element;
      if (ALLOWED_UPDATES.includes(element)) {
        newObject[element] = userData[element];
      }
    });
    newObject["skills"] = newObject["skills"].map((skill) => skill.value);
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
    try {
      dispatch(showLoader());
      setIsFetching(true);
      const res = await fetch("http://localhost:3000/profile/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let responseData = await res.json();
      if (responseData?.messageType == "S") {
        const clonedData = { ...responseData?.data };
        const skillsData = clonedData.skills.map((skill) => ({
          label: skill,
          value: skill,
        }));
        clonedData.skills = skillsData;
        // const skillsData = responseData?.data["skills"].map((skill) => {
        //   return { value: skill, label: skill };
        // });
        setProfileInfo(clonedData);
      } else {
        dispatch(
          addToast({
            message: responseData?.message,
            messageType: "E",
          })
        );
      }
    } catch (err) {
      console.error(err.message);
      dispatch(
        addToast({
          message: err.message,
          messageType: "E",
        })
      );
    } finally {
      setIsFetching(false);
      dispatch(hideLoader());
    }
  };

  // const getProfile = async () => {
  //   try {
  //     dispatch(showLoader());
  //     setIsFetching(true);
  //     const res = await fetch("http://localhost:3000/profile/view", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const responseData = await res.json();
  //     dispatch(hideLoader());
  //      (responseData);
  //     if (responseData?.messageType == "S") {
  //       setProfileInfo(responseData?.data);
  //     } else {
  //       dispatch(
  //         addToast({
  //           message: responseData?.message,
  //           messageType: "E",
  //         })
  //       );
  //     }
  //   } catch (err) {
  //     dispatch(
  //       addToast({
  //         message: err.message,
  //         messageType: "E",
  //       })
  //     );
  //   } finally {
  //     setIsFetching(false);
  //     dispatch(hideLoader());
  //   }
  // };
  useEffect(() => {
    if (!isFetching) {
      getProfile();
    }
  }, []);
  // if (loader.isLoading) {
  //   return <Loader />;
  // }
  return (
    <>
      {profileInfo ? (
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
                {/* <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  value={profileInfo?.skills}
                  onChange={(e) => {
                    setProfileInfo((existingData) => {
                      return { ...existingData, skills: e.target.value };
                    });
                  }}
                /> */}
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={skills}
                  value={profileInfo.skills}
                  className="w-full bg-inherit text-white"
                  onChange={(selected) =>
                    setProfileInfo({ ...profileInfo, skills: selected })
                  }
                  styles={customStyles}
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
                <Select
                  options={itRoles}
                  components={animatedComponents}
                  value={itRoles.find(
                    (role) => role.value === profileInfo.designation
                  )}
                  className="w-full bg-inherit"
                  onChange={(selected) =>
                    setProfileInfo({
                      ...profileInfo,
                      designation: selected.value,
                    })
                  }
                  styles={customStyles}
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
      ) : (
        <div className=" flex justify-center items-center">
          Profile information not found
        </div>
      )}
    </>
  );
};

export default Profile;
