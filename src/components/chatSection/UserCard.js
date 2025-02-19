import React from "react";

const UserCard = ({ profileURL, name }) => {
  return (
    <div className="flex w-full items-center justify-center border-[1px] gap-3 rounded-2xl p-1 shadow-lg">
      <div className="avatar">
        <div className="ring-4 ring-primary ring-offset-2 ring-offset-base-100 w-14 h-14 rounded-full overflow-hidden transform transition-all ">
          <img
            src={
              profileURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={`AB`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full h-full items-center flex">
        <span className="font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default UserCard;
