import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AddCircleOutline, Save, Cancel } from "@mui/icons-material";

const EducationModal = ({ educationDetails = [], onSave }) => {
  const [education, setEducations] = useState([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    },
  ]);

  useEffect(() => {
    if (educationDetails.length > 0) {
      setEducations(educationDetails);
    }
  }, [educationDetails]);

  const handleChange = (index, event) => {
    const values = [...education];
    values[index][event.target.name] = event.target.value;
    setEducations(values);
  };

  const handleAddEducation = () => {
    setEducations((prevEducations) => [
      ...prevEducations,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleDeleteEducation = (index) => {
    setEducations((prevEducations) =>
      prevEducations.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    onSave({ education: education });
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
      {education.map((education, index) => (
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
                onClick={() => handleDeleteEducation(index)}
              >
                <Cancel />
              </button>
              <input
                type="text"
                placeholder="Institution"
                name="institution"
                className="input input-bordered w-full "
                value={education.institution}
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                placeholder="Degree"
                name="degree"
                className="input input-bordered w-full "
                value={education.degree}
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                placeholder="Field of Study"
                name="fieldOfStudy"
                className="input input-bordered w-full "
                value={education.fieldOfStudy}
                onChange={(event) => handleChange(index, event)}
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  placeholder="Start Year"
                  name="startDate"
                  className="input input-bordered w-full "
                  value={DateFormatter(education.startDate)}
                  onChange={(event) => handleChange(index, event)}
                />
                <input
                  type="date"
                  placeholder="End Year"
                  name="endDate"
                  className="input input-bordered w-full "
                  value={DateFormatter(education.endDate)}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center gap-4">
        <button
          onClick={handleAddEducation}
          className="btn btn-outline flex items-center gap-2"
        >
          <AddCircleOutline /> Add Education
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

export default EducationModal;
