// import React from "react";
// import { Link } from "react-router-dom";
// import { HomeOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import { MessageOutlined } from "@ant-design/icons";
// import { UsergroupAddOutlined } from "@ant-design/icons";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import NavBar from "../components/NavBar";
// const Sidebar = ({ children }) => {
//   const icons = [
//     { icon: <HomeOutlined style={{ fontSize: "28px" }} />, link: "/dashboard" },
//     {
//       icon: <UsergroupAddOutlined style={{ fontSize: "28px" }} />,
//       link: "/connections",
//     },
//     { icon: <MessageOutlined style={{ fontSize: "28px" }} />, link: "/chat" },
//     { icon: <SettingsOutlinedIcon style={{ fontSize: "28px" }} />, link: "" },
//     {
//       icon: <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />,
//       link: "/profile",
//     },
//     // {
//     //   icon: <LogoutOutlinedIcon style={{ fontSize: "28px" }} />,
//     //   link: "/",
//     // },
//   ];
//   console.log("in SideBar");
//   const user = useSelector((store) => store.user);
//   return (
//     <div className="flex h-screen w-full flex-col items-center max-h-full">
//       <div className="flex w-full h-fit">
//         <NavBar />
//       </div>
//       <div className="flex w-full h-full justify-center items-center">
//         <div className="ml-2 flex flex-col h-2/5 border-[1px] w-[60px] rounded-3xl justify-center items-center gap-6">
//           {icons.map((iconinfo, index) => {
//             iconinfo;
//             return (
//               <Link
//                 to={iconinfo.link}
//                 className="transition-all duration-300 transform hover:scale-125"
//                 key={index + iconinfo.link}
//               >
//                 {iconinfo.icon}
//               </Link>
//             );
//           })}
//         </div>
//         <div className="ml-5 h-full w-full flex items-center justify-center max-h-[854px]">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   HomeOutlined,
//   MessageOutlined,
//   UsergroupAddOutlined,
// } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import NavBar from "../components/NavBar";

// const Sidebar = ({ children }) => {
//   const icons = [
//     { icon: <HomeOutlined style={{ fontSize: "28px" }} />, link: "/dashboard" },
//     {
//       icon: (
//         <>
//           <NotificationsNoneOutlinedIcon style={{ fontSize: "32px" }} />
//           <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center"></span>
//         </>
//       ),
//       link: "/notifications",
//     },
//     { icon: <MessageOutlined style={{ fontSize: "28px" }} />, link: "/chat" },
//     {
//       icon: <UsergroupAddOutlined style={{ fontSize: "28px" }} />,
//       link: "/connections",
//     },
//     {
//       icon: <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />,
//       link: "/profile",
//     },
//   ];

//   const user = useSelector((store) => store.user);

//   return (
//     <div className="flex h-screen w-full flex-col">
//       <div className="flex w-full">
//         <NavBar />
//       </div>
//       <div className="flex w-full flex-1 overflow-hidden">
//         <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col h-2/5 border-[1px] w-[60px] rounded-3xl justify-center items-center gap-6 bg-white z-10">
//           {icons.map((iconinfo, index) => (
//             <Link
//               to={iconinfo.link}
//               className="transition-all duration-300 transform hover:scale-125"
//               key={index + iconinfo.link}
//             >
//               {iconinfo.icon}
//             </Link>
//           ))}
//         </div>
//         <div className="flex-1 pl-20 pr-4 py-4 overflow-auto max-h-full flex justify-center items-center">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NavBar from "../components/NavBar";

const Sidebar = ({ children }) => {
  const user = useSelector((store) => store.user);
  const icons = [
    { icon: <HomeOutlined style={{ fontSize: "28px" }} />, link: "/dashboard" },
    {
      icon: (
        <div className="relative">
          <NotificationsNoneOutlinedIcon style={{ fontSize: "32px" }} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center"></span>
        </div>
      ),
      link: "/notifications",
    },
    { icon: <MessageOutlined style={{ fontSize: "28px" }} />, link: "/chat" },
    {
      icon: <UsergroupAddOutlined style={{ fontSize: "28px" }} />,
      link: "/connections",
    },
    // {
    //   icon: <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />,
    //   link: "/profile",
    // },
    {
      icon: (
        <Avatar
          alt="Remy Sharp"
          src={user?.photoURL}
          sx={{ width: 35, height: 35 }}
        />
      ),
      link: "/profile",
    },
  ];

  //const user = useSelector((store) => store.user);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-900 text-white">
      {/* <div className="flex w-fit">
        <a className="btn btn-ghost text-xl">DevConnect</a>
      </div> */}
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col h-2/5 border-[1px] border-gray-700 w-[60px] rounded-3xl justify-center items-center gap-6 bg-gray-800 bg-opacity-60 backdrop-blur-md z-10 shadow-lg">
          {icons.map((iconinfo, index) => (
            <Link
              to={iconinfo.link}
              className="transition-transform duration-300 transform hover:scale-110 hover:text-blue-400"
              key={index + iconinfo.link}
            >
              {iconinfo.icon}
            </Link>
          ))}
        </div>
        <div className="flex-1 pl-20 overflow-auto max-h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
