import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Employee from "../Pages/Employee/Employee";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "employee",
        element: <Employee />,
      },
    ],
  },
]);
