import React from "react";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../reduxSlice/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../reduxSlice/ToastSlice";
import Select from "react-select";
import { itRoles, skills } from "../staticdata/rolls_skills";
import makeAnimated from "react-select/animated";
import Header from "./profilesection/Header";
import JobExperience from "./profilesection/JobExperience";
import Skills from "./profilesection/Skills";
import Education from "./profilesection/Education";
import { openModal, closeModal } from "../reduxSlice/modalSlice";
import Modal from "../Utils/Modal";
import EducationModal from "./profilesection/EducationModal";
import ExperienceModal from "./profilesection/ExperienceModal";
import SkillsModal from "./profilesection/SkillsModal";

const Profile = () => {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal);
  const [isFetching, setIsFetching] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");
  const [pending, setPending] = useState(false);
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
    "education",
    "experiance",
  ];
  const handleOnSave = (x) => {
    console.log(x);
    setProfileInfo((existingData) => {
      return { ...existingData, ...x };
    });
    setPending(true);
  };
  const handleSaveClick = async () => {
    const userData = profileInfo;
    userData;
    const newObject = {};
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
        dispatch(closeModal());
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
  useEffect(() => {
    if (!isFetching) {
      getProfile();
    }
  }, []);
  useEffect(() => {
    if (pending) {
      handleSaveClick();
      setPending(false);
    }
  }, [pending]);
  // if (loader.isLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="w-[95%] h-[85%] flex flex-col border-[1px] rounded-xl  shadow-lg overflow-y-auto max-h-[85%]">
      <Header
        photoURL={profileInfo?.photoURL}
        about={profileInfo?.about}
        firstName={profileInfo?.firstName}
        lastName={profileInfo?.lastName}
        companyName={profileInfo?.company}
        designation={profileInfo?.designation}
      />
      <div className="w-full h-full flex flex-col gap-3 p-8">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-semibold mb-3">Education</h2>
          <button
            className="border-[1px] p-2  hover:bg-gray-600 transition-all"
            onClick={() => dispatch(openModal("Education"))}
          >
            Add Education
          </button>
        </div>
        <Education educationDetails={profileInfo?.education} />
      </div>
      <div className="w-full h-full flex flex-col gap-3 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-3">Experience</h2>
          <button
            className="border-[1px] p-2 hover:bg-gray-600 transition-all"
            onClick={() => dispatch(openModal("Experience"))}
          >
            Add Experience
          </button>
        </div>
        <JobExperience experienceDetails={profileInfo?.experiance} />
      </div>
      <div className="w-full h-full flex flex-col gap-3 p-8">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-semibold mb-3">Skills</h2>
          <button
            className="border-[1px] p-2  hover:bg-gray-600 transition-all"
            onClick={() => dispatch(openModal("Skills"))}
          >
            Add Skills
          </button>
        </div>
        <Skills skills={profileInfo?.skills} />
      </div>
      {modal.key && (
        <Modal
          maxWidth={"sm"}
          key="Education"
          uniqueKey={modal.key}
          closeOnOutsideClick={true}
        >
          {(() => {
            switch (modal.key) {
              case "Education":
                return (
                  <EducationModal
                    educationDetails={profileInfo?.education}
                    onSave={handleOnSave}
                  />
                );
              case "Experience":
                return (
                  <ExperienceModal
                    experianceDetails={profileInfo?.experiance}
                    onSave={handleOnSave}
                  />
                );
              case "Skills":
                return (
                  <SkillsModal
                    skillsDetails={profileInfo?.skills}
                    onSave={handleOnSave}
                  />
                );
              default:
                return null;
            }
          })()}
        </Modal>
      )}
    </div>
  );
};
export default Profile;
