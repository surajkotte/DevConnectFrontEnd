import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { MessageOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
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
  const user = useSelector((store) => store.user);
  return (
    <div className="flex h-full items-center">
      <div className="ml-2 flex flex-col h-2/5 border-[1px] w-[60px] rounded-3xl justify-center items-center gap-6">
        {icons.map((iconinfo, index) => {
          console.log(iconinfo);
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
        {/* <Link>
          <HomeOutlined style={{ fontSize: "28px" }} />
        </Link>
        <Link>
          <UsergroupAddOutlined style={{ fontSize: "28px" }} />
        </Link>
        <Link>
          <MessageOutlined style={{ fontSize: "28px" }} />
        </Link>
        <Link>
          <SettingsOutlinedIcon style={{ fontSize: "28px" }} />
        </Link>
        <Link>
          <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />
        </Link>
        <Link>
          <LogoutOutlinedIcon style={{ fontSize: "28px" }} />
        </Link> */}
      </div>
      <div className="ml-5 h-full w-full overflow-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
