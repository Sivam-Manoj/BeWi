import { RouteObject } from "react-router-dom";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import Employee from "../../../Pages/Employee/Employee";
import Stocks from "../../../Pages/Stocks/Stocks";
import Orders from "../../../Pages/Orders/Orders";

const childRoutes: RouteObject[] = [
  { index: true, element: <Dashboard /> },
  { path: "employee", element: <Employee /> },
  { path: "stocks", element: <Stocks /> },
  { path: "orders", element: <Orders /> },
];

export default childRoutes;
