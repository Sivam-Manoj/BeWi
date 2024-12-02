import { RouteObject } from "react-router-dom";
import RootLayout from "../../../Layout/RootLayout";
import ErrorPage from "../../../Pages/Error/ErrorPage";
import childRoutes from "../Child/ChildRoutes";

const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [...childRoutes],
  },
];

export default rootRoutes;
