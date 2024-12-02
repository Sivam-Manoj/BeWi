import { RouteObject } from "react-router-dom";
import Login from "../../../Pages/Auth/Login";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
];

export default authRoutes;
