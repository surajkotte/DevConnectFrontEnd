// import React, { useEffect, useState } from "react";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import MyConnection from "./MyConnection";
// import MyRequest from "./MyRequest";
// import MySent from "./MySent";
// import MyNetwork from "./MyNetwork";

// const Connections = () => {
//   const [activeTab, setActiveTab] = useState("connections");

//   return (
//     <div className="flex flex-col w-[90%] h-[85%] max-h-[85%] border-[1px] rounded-2xl items-center gap-5">
//       <div className="flex w-full justify-center">
//         <div className="flex lg:w-[40%] md:w-[90%] sm:w-[90%] h-10 mt-4 rounded-3xl border-[1px] justify-between items-center p-1">
//           <div
//             className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
//               activeTab === "connections"
//                 ? "bg-blue-500 text-white"
//                 : "bg-transparent text-white"
//             }`}
//             onClick={() => setActiveTab("connections")}
//           >
//             Grow
//           </div>
//           <div
//             className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
//               activeTab === "requests"
//                 ? "bg-blue-500 text-white"
//                 : "bg-transparent text-white"
//             }`}
//             onClick={() => setActiveTab("requests")}
//           >
//             Received
//           </div>
//           <div
//             className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
//               activeTab === "sent"
//                 ? "bg-blue-500 text-white"
//                 : "bg-transparent text-white"
//             }`}
//             onClick={() => setActiveTab("sent")}
//           >
//             Sent
//           </div>
//           <div
//             className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
//               activeTab === "mynetwork"
//                 ? "bg-blue-500 text-white"
//                 : "bg-transparent text-white"
//             }`}
//             onClick={() => setActiveTab("mynetwork")}
//           >
//             My Network
//           </div>
//         </div>
//         <div className="flex items-center justify-center h-10 w-10 bg-blue-500 rounded-full ">
//           <SearchOutlinedIcon />
//         </div>
//       </div>

//       <div className="flex h-full w-full items-center overflow-auto">
//         {activeTab === "connections" ? (
//           <MyConnection />
//         ) : activeTab === "requests" ? (
//           <MyRequest />
//         ) : activeTab === "sent" ? (
//           <MySent />
//         ) : (
//           <MyNetwork />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Connections;
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MyConnection from "./MyConnection";
import MyRequest from "./MyRequest";
import MySent from "./MySent";
import MyNetwork from "./MyNetwork";

const Connections = () => {
  const [activeTab, setActiveTab] = useState("connections");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col w-[95%] h-[85%] max-h-[85%] border-[1px] rounded-2xl items-center gap-5 relative shadow-2xl">
      {/* Tabs Section */}
      <div className="flex w-full justify-center mt-4 relative">
        <div className="flex lg:w-[40%] md:w-[60%] sm:w-[80%] h-10 rounded-3xl border-[1px] justify-between items-center p-1">
          {["connections", "requests", "sent", "mynetwork"].map((tab) => (
            <div
              key={tab}
              className={`flex-1 flex justify-center items-center rounded-3xl cursor-pointer ${
                activeTab === tab
                  ? "bg-blue-500 text-grey"
                  : "bg-transparent text-grey"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "connections"
                ? "Grow"
                : tab === "requests"
                ? "Received"
                : tab === "sent"
                ? "Sent"
                : "My Network"}
            </div>
          ))}
        </div>

        {/* Search Button & Input (Right-aligned) */}
        <div className="absolute right-4 flex items-center gap-2">
          {showSearch && (
            <input
              type="text"
              className="h-10 px-4 rounded-3xl border border-gray-300 outline-none transition-all duration-300"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <div
            className="flex items-center justify-center h-10 w-10 border-[1px] border-blue-500 rounded-full cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <SearchOutlinedIcon />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex h-full w-full items-center overflow-auto">
        {activeTab === "connections" ? (
          <MyConnection />
        ) : activeTab === "requests" ? (
          <MyRequest />
        ) : activeTab === "sent" ? (
          <MySent />
        ) : (
          <MyNetwork />
        )}
      </div>
    </div>
  );
};

export default Connections;
