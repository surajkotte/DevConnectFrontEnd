import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "@mui/icons-material";
const AboutModal = ({
  firstName,
  lastName,
  about,
  gitHubURL,
  instagramURL,
  onSave,
}) => {
  const [about1, setAbout1] = useState({
    firstName: "",
    lastName: "",
    about: "",
    gitHubURL: "",
    instagramURL: "",
  });
  const handleChange = (event) => {
    setAbout1((info) => ({
      ...info,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSave = () => {
    onSave({
      firstName: about1.firstName,
      lastName: about1.lastName,
      about: about1.about,
      gitHubURL: about1.gitHubURL,
      instagramURL: about1.instagramURL,
    });
  };
  useEffect(() => {
    setAbout1({ firstName, lastName, about, gitHubURL, instagramURL });
  }, [firstName, lastName, about, gitHubURL, instagramURL]);
  return (
    <div className="flex flex-col gap-6 p-6 bg-base-200 rounded-xl shadow-lg max-w-2xl mx-auto">
      <motion.div
        key={firstName + lastName}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-3 relative">
          <input
            type="text"
            placeholder="Last Name"
            name="firstName"
            className="flex input input-bordered w-full "
            value={about1.firstName}
            onChange={(event) => handleChange(event)}
          />
          <input
            type="text"
            placeholder="First Name"
            name="lastName"
            className="input input-bordered w-full "
            value={about1.lastName}
            onChange={(event) => handleChange(event)}
          />
          <input
            type="url"
            placeholder="gitHub Url"
            name="gitHubURL"
            className="input input-bordered w-full "
            value={about1.gitHubURL}
            onChange={(event) => handleChange(event)}
          />
          <input
            type="url"
            placeholder="instagram Account"
            name="instagramURL"
            className="input input-bordered w-full "
            value={about1.instagramURL}
            onChange={(event) => handleChange(event)}
          />
          <textarea
            placeholder="About"
            name="about"
            className="flex input input-bordered w-full min-h-60 max-h-60"
            value={about1.about}
            onChange={(event) => handleChange(event)}
          />
        </div>
      </motion.div>
      <div className="flex justify-center gap-4">
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={handleSave}
        >
          <Save /> Save
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
