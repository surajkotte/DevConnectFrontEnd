import React from "react";
import FeedPage from "./feedSection/FeedPage";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="w-full h-full flex flex-col items-center overflow-y-auto grow">
      <FeedPage user={user} />
    </div>
  );
};

export default Home;
