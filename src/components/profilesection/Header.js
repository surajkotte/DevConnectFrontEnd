import React from "react";

const Header = ({
  photoURL,
  firstName,
  lastName,
  about,
  companyName,
  designation,
}) => {
  return (
    <div className=" shadow-lg rounded-lg p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Avatar Section */}
        <div className="avatar">
          <div className="ring-4 ring-primary ring-offset-2 ring-offset-base-100 w-36 h-36 rounded-full overflow-hidden transform transition-all ">
            <img
              src={
                photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name, Designation, and Company Section */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">
            {firstName} {lastName}
          </h1>
          {designation && (
            <p className="text-xl mt-2 font-medium">{designation}</p>
          )}
          {companyName && <p className="text-lg mt-1">{companyName}</p>}
        </div>
      </div>

      {/* About Section */}
      {about && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">About</h2>
          <p className="leading-relaxed p-4 rounded-lg shadow-sm">
            {about ? about : "No Details Found"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
