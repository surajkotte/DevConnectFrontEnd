import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addUserData } from "../reduxSlice/userSlice";
import Login from "./Login";
import { hideLoader, showLoader } from "../reduxSlice/loaderSlice";
import { addToast } from "../reduxSlice/ToastSlice";
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
      if (responseData?.messageType == "S") {
        dispatch(addUserData(responseData?.data));
        console.log(" in private");
      } else {
        //dispatch(addToast({ messageType: "E", message: responseData.message }));
        navigate("/login");
      }
    } catch (err) {
      dispatch(addToast({ messageType: "E", message: err.message }));
      console.log(" in private");
      navigate("/login");
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    console.log("in privateroute");
    fetchUser();
  }, [location.pathname]);
  return user ? (
    <div className="w-full h-full flex flex-col">{children}</div>
  ) : (
    <Login />
  );
};

export default PrivateRoute;
