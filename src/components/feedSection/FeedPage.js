import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import {
  PhotoCameraOutlined,
  VideocamOutlined,
  AccountTreeOutlined,
  ArticleOutlined,
} from "@mui/icons-material";

const FeedPage = () => {
  const user = useSelector((store) => store.user);
  const text = `SAP Business Technology Platform (BTP) is a cloud-based platform that provides integrated solutions for database management, analytics, application development, integration, and AI services. It enables businesses to extend, integrate, and innovate their SAP and non-SAP applications efficiently. SAP BTP consists of four main pillars:
1️⃣ Database & Data Management
SAP HANA Cloud → In-memory database for real-time data processing
SAP Data Warehouse Cloud → Centralized data warehousing solution
SAP IQ → High-performance analytics database
SAP Datasphere → Unified data fabric for enterprise-wide insights
2️⃣ Analytics & Planning
SAP Analytics Cloud (SAC) → Provides business intelligence (BI), planning, and predictive analytics
SAP Data Intelligence → Manages and processes large-scale data
3️⃣ Application Development & Integration
SAP Business Application Studio → A cloud-based IDE for developing SAP Fiori/UI5 and CAP applications
SAP Integration Suite → Connects SAP and third-party applications
SAP Extension Suite → Helps in extending SAP applications using microservices and APIs
SAP Mobile Services → Develops mobile-first applications
4️⃣ Artificial Intelligence (AI), IoT, & Automation
SAP AI Core & AI Foundation → Helps in integrating AI/ML models into applications
SAP Internet of Things (IoT) → Enables IoT data processing
SAP RPA (Robotic Process Automation) → Automates repetitive business tasks`;
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonsArray = [
    {
      name: "Photo",
      icon: <PhotoCameraOutlined />,
    },
    {
      name: "Video",
      icon: <VideocamOutlined />,
    },
    {
      name: "Project",
      icon: <AccountTreeOutlined />,
    },
    { name: "Article", icon: <ArticleOutlined /> },
  ];
  return (
    <div className="flex flex-col items-center w-full h-full gap-5 bg-gray-100 overflow-y-auto max-h-screen">
      <Card
        className="w-full max-w-xl p-4 bg-white border border-gray-300 shadow-lg rounded-xl mt-2"
        style={{ minHeight: "150px" }}
      >
        <div className="flex items-center gap-3">
          {/* User Profile Image */}
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Input */}
          <input
            type="text"
            placeholder="Create post"
            className="w-full h-10 px-4 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Post Options */}
        <div className="flex justify-around mt-3 border-t border-gray-200 pt-3">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
            <PhotoCameraOutlined />
            <span>Photo</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
            <VideocamOutlined />
            <span>Video</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-purple-500">
            <AccountTreeOutlined />
            <span>Project</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
            <ArticleOutlined />
            <span>Article</span>
          </button>
        </div>
      </Card>
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 p-2 ">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="font-medium">{"Software Engineer"}</p>
          </div>
        </div>
        <div className="flex p-2">
          <p
            className={`text-gray-700 ${
              isExpanded ? "" : "line-clamp-3 overflow-hidden"
            } transition-all`}
          >
            {isExpanded ? text : `${text.slice(0, 200)}... `}
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-500 hover:underline inline"
              >
                Read More
              </button>
            )}
          </p>
        </div>
        <div className="flex">
          <img
            src={
              "https://learning.sap-press.com/hs-fs/hubfs/image-png-Aug-29-2024-02-31-27-0426-PM.png?width=992&height=861&name=image-png-Aug-29-2024-02-31-27-0426-PM.png"
            }
          ></img>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
