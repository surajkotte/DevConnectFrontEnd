import React from "react";
import FeedPage from "./feedSection/FeedPage";
const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center overflow-y-auto grow">
      <FeedPage />
    </div>
  );
};

export default Home;
