import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AddCircleOutline, Save, Cancel } from "@mui/icons-material";

const ExperienceModal = ({ experianceDetails = [], onSave }) => {
  const [experiance, setExperiances] = useState([
    {
      company: "",
      designation: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (experianceDetails.length > 0) {
      setExperiances(experianceDetails);
    }
  }, [experianceDetails]);

  const handleChange = (index, event) => {
    const values = [...experiance];
    values[index][event.target.name] = event.target.value;
    setExperiances(values);
  };

  const handleAddExperiance = () => {
    setExperiances((prevexperiances) => [
      ...prevexperiances,
      {
        company: "",
        designation: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleDeleteexperiance = (index) => {
    setExperiances((prevexperiances) =>
      prevexperiances.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    onSave({ experiance: experiance });
  };
  const DateFormatter = (date) => {
    if (!date) return "";
    const Date1 = new Date(date);
    const year = Date1.getFullYear();
    const month = String(Date1.getMonth() + 1).padStart(2, "0");
    const day = String(Date1.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-base-200 rounded-xl shadow-lg max-w-2xl mx-auto">
      {experiance &&
        experiance.map((experiance, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card w-full bg-base-100 shadow-md p-4 rounded-lg">
              <div className="card-body flex flex-col gap-3 relative">
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteexperiance(index)}
                >
                  <Cancel />
                </button>
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  className="input input-bordered w-full text-white"
                  value={experiance.company}
                  onChange={(event) => handleChange(index, event)}
                />
                <input
                  type="text"
                  placeholder="Designation"
                  name="designation"
                  className="input input-bordered w-full text-white"
                  value={experiance.designation}
                  onChange={(event) => handleChange(index, event)}
                />
                <div className="flex gap-4">
                  <input
                    type="date"
                    placeholder="Start Year"
                    name="startDate"
                    className="input input-bordered w-full text-white"
                    value={DateFormatter(experiance.startDate)}
                    onChange={(event) => handleChange(index, event)}
                  />
                  <input
                    type="date"
                    placeholder="End Year"
                    name="endDate"
                    className="input input-bordered w-full text-white"
                    value={DateFormatter(experiance.endDate)}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

      <div className="flex justify-center gap-4">
        <button
          onClick={handleAddExperiance}
          className="btn btn-outline flex items-center gap-2"
        >
          <AddCircleOutline /> Add experiance
        </button>
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

export default ExperienceModal;
