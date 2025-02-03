import React from "react";

const About = ({ about }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <p className="leading-relaxed p-4 rounded-lg shadow-md">
        {about ? about : "No Details Found"}
      </p>
    </div>
  );
};

export default About;
