import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./RoutesLists/Auth/AuthRoutes";
import rootRoutes from "./RoutesLists/Root/rootRoutes";

export const router = createBrowserRouter([...rootRoutes, ...authRoutes]);
