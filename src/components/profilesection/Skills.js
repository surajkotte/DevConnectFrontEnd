import React from "react";

const Skills = ({ skills }) => {
  return (
    <div className=" rounded-lg">
      <ul className="flex gap-4 flex-wrap">
        {skills &&
          skills?.map((skill, index) => (
            <li
              key={index}
              className="p-4 rounded-lg  hover:bg-gray-200 transition duration-200 space-x-2 shadow-md"
            >
              {skill.value}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Skills;
