import React, { useEffect, useState } from "react";
import { skills } from "../../staticdata/rolls_skills";
import { AddCircleOutline, Save, Cancel } from "@mui/icons-material";

const SkillsModal = ({ skillsDetails, onSave }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    if (skillsDetails?.length > 0) {
      setSelectedSkills(skillsDetails);
    }
  }, [skillsDetails]);

  useEffect(() => {
    if (searchVal.trim()) {
      setFilteredSkills(
        skills.filter((skill) =>
          skill.label.toLowerCase().includes(searchVal.toLowerCase())
        )
      );
    } else {
      setFilteredSkills([]);
    }
  }, [searchVal]);

  const handleSelectSkill = (skill) => {
    if (!selectedSkills.some((s) => s.value === skill.value)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSearchVal("");
    setFilteredSkills([]);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(updatedSkills);
  };

  const handleSave = () => {
    onSave({ skills: selectedSkills });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-base-200 rounded-xl shadow-lg max-w-2xl mx-auto h-96 overflow-y-auto justify-between">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search Skills"
          className="input input-bordered input-primary w-full max-w-full text-white"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        {filteredSkills.length > 0 && (
          <div className="bg-white shadow-md border rounded-lg p-2 absolute max-w-sm w-full max-h-96 overflow-y-auto">
            {filteredSkills.map((skill) => (
              <div
                key={skill.value}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectSkill(skill)}
              >
                {skill.label}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {selectedSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center"
            >
              {skill.label}
              <button className="ml-2" onClick={() => handleDeleteSkill(index)}>
                <Cancel />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 text-sm">
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

export default SkillsModal;
