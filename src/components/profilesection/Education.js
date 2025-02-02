import React from "react";

const Education = ({ educationDetails }) => {
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

  // return (
  //   <div className="education-section pt-3 rounded-lg shadow-md">
  //     {educationDetails &&
  //       educationDetails.map((education, index) => (
  //         <div key={index} className="education-item mb-6">
  //           <h3 className="text-xl font-semibold">{education.institution}</h3>
  //           <p className="text-lg">{education.degree}</p>
  //           <p className="text-md text-gray-600">{education.fieldOfStudy}</p>
  //           <p className="text-sm text-gray-500">
  //             {DateFormatter(education.startDate)} to{" "}
  //             {DateFormatter(education.endDate)}
  //           </p>
  //         </div>
  //       ))}
  //   </div>
  // );
  return (
    <ul className="timeline">
      {educationDetails &&
        educationDetails.map((educationInfo, index) => {
          return (
            <li key={index}>
              <hr />
              <div className="timeline-start">
                <div className="border-[1px] rounded-full p-2">
                  {DateFormatter(educationInfo.startDate)} to{" "}
                  {educationInfo.endDate
                    ? DateFormatter(educationInfo.endDate)
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
              <div className="timeline-end timeline-box items-center justify-center flex flex-col">
                <h2 className="fle font-bold text-lg">{educationInfo.institution}</h2>
                <p className="flex text-sm">{educationInfo?.degree}</p>
                <p className="flex text-sm">{educationInfo?.fieldOfStudy}</p>
              </div>
              <hr />
            </li>
          );
        })}
    </ul>
  );
};

export default Education;
