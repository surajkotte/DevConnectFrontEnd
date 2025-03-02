import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { MessageOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NavBar from "../components/NavBar";
const Sidebar = ({ children }) => {
  const icons = [
    { icon: <HomeOutlined style={{ fontSize: "28px" }} />, link: "/dashboard" },
    {
      icon: <UsergroupAddOutlined style={{ fontSize: "28px" }} />,
      link: "/connections",
    },
    { icon: <MessageOutlined style={{ fontSize: "28px" }} />, link: "/chat" },
    { icon: <SettingsOutlinedIcon style={{ fontSize: "28px" }} />, link: "" },
    {
      icon: <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />,
      link: "/profile",
    },
    // {
    //   icon: <LogoutOutlinedIcon style={{ fontSize: "28px" }} />,
    //   link: "/",
    // },
  ];
  console.log("in SideBar");
  const user = useSelector((store) => store.user);
  return (
    <div className="flex h-screen w-full flex-col items-center max-h-full">
      <div className="flex w-full h-fit">
        <NavBar />
      </div>
      <div className="flex w-full h-full justify-center items-center">
        <div className="ml-2 flex flex-col h-2/5 border-[1px] w-[60px] rounded-3xl justify-center items-center gap-6">
          {icons.map((iconinfo, index) => {
            iconinfo;
            return (
              <Link
                to={iconinfo.link}
                className="transition-all duration-300 transform hover:scale-125"
                key={index + iconinfo.link}
              >
                {iconinfo.icon}
              </Link>
            );
          })}
        </div>
        <div className="ml-5 h-full w-full flex items-center justify-center max-h-[854px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
