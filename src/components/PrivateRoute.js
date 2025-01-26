import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../reduxSlice/userSlice";
import Loader from "../Utils/loader";
import Login from "./Login";
import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";
import { addToast } from "../reduxSlice/ToastSlice";
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const loader = useSelector((store) => store.loader);
  const fetchUser = async () => {
    try {
      dispatch(showLoader());
      const res = await fetch("http://localhost:3000/profile/view", {
        method: "GET",
        credentials: "include",
      });
      const responseData = await res.json();
      responseData + " in PrivateRoute";
      if (responseData?.messageType == "S") {
        dispatch(addUserData(responseData?.data));
      } else {
        dispatch(addToast({ messageType: "E", message: err.message }));
        navigate("/login");
      }
    } catch (err) {
      dispatch(addToast({ messageType: "E", message: err.message }));
      navigate("/login");
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return user ? <div className="w-full h-full">{children}</div> : <Login />;
};

export default PrivateRoute;
