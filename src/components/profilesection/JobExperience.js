import React from "react";

const JobExperience = ({ experienceDetails }) => {
  const DateFormatter = (date) => {
    const monthChar = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (!date) return "";
    const Date1 = new Date(date);
    const year = Date1.getFullYear();
    const month = String(Date1.getMonth() + 1).padStart(2, "0");
    const day = String(Date1.getDate()).padStart(2, "0");
    return `${monthChar[month - 1]}-${year}`;
  };
  return (
    <ul className="timeline">
      {experienceDetails &&
        experienceDetails.map((experience, index) => {
          return (
            <li key={index}>
              <hr />
              <div className="timeline-start">
                <div className="border-[1px] rounded-full p-2">
                  {DateFormatter(experience.startDate)} to{" "}
                  {experience.endDate
                    ? DateFormatter(experience.endDate)
                    : "Current"}
                </div>
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box flex flex-col justify-center items-center">
                <h2 className="flex font-bold">{experience.company}</h2>
                <p className=" flex">{experience.designation}</p>
                {/* <p>{experience.description}</p> */}
              </div>
              <hr />
            </li>
          );
        })}
    </ul>
  );
};

export default JobExperience;
