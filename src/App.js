import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Connections from "./components/Connections";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Sidebar from "./Utils/Sidebar";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import Store from "./Redux/store";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import "./index.css";
import { addUserData } from "./reduxSlice/userSlice";
import Loader from "./Utils/loader";
import Toast from "./Utils/Toast";
import Modal from "./Utils/Modal";
import Notifications from "./components/Notifications";

const App = () => {
  return (
    <>
      {/* <Loader /> */}
      <Loader>
        <PrivateRoute>
          <Sidebar>
            <Outlet />
          </Sidebar>
        </PrivateRoute>
      </Loader>
    </>
  );
};

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
      { path: "/notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App/>);
root.render(
  <Provider store={Store}>
    <Toast>
      <RouterProvider router={routers} />
    </Toast>
  </Provider>
);
