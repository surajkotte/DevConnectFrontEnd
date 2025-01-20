import React, { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import userStore from "../Redux/store";
import { clearUserData } from "../reduxSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { addToast } from "../reduxSlice/ToastSlice";
const NavBar = () => {
  const navigate = useNavigate();
  const store = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    const res = await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (res.status == 200) {
      dispatch(clearUserData());
      dispatch(addToast({ message: data?.message, messageType: "S" }));
      navigate("/login");
    } else {
      dispatch(addToast({ message: data?.message, messageType: "E" }));
    }
  };
   ("in NavBar");
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevConnect</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  store
                    ? store.photoURL
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
