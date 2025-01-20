import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../reduxSlice/userSlice";
import Loader from "../Utils/loader";
import Login from "./Login";
import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const loader = useSelector((store) => store.loader);
  console.log(loader);
  const fetchUser = async () => {
    const res = await fetch("http://localhost:3000/profile/view", {
      method: "GET",
      credentials: "include",
    });
    const responseData = await res.json();
    console.log(responseData + " in PrivateRoute");
    dispatch(hideLoader());
    if (responseData["messageType"] == "S") {
      dispatch(addUserData(responseData?.data));
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      dispatch(showLoader());
      fetchUser();
    }
  }, []);
  if (loader.isLoading) {
    return <Loader />;
  }
  console.log(user + " redux user");
  return user ? children : <Login />;
};

export default PrivateRoute;
