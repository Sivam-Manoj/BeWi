import {
  Settings,
  StorageOutlined,
  Dashboard,
  PeopleOutline, // Employee Icon
  FileCopy, // Orders Icon
  CloudUpload, // Uploads Icon
} from "@mui/icons-material";

interface MenuItemType {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const menuItems: MenuItemType[] = [
  {
    icon: <Dashboard fontSize="large" />,
    label: "Dashboard",
    to: "/",
  },
  {
    icon: <PeopleOutline fontSize="large" />, // Updated Employee icon
    label: "Employee",
    to: "/employee",
  },
  {
    icon: <StorageOutlined fontSize="large" />,
    label: "Stocks",
    to: "/stocks",
  },
  {
    icon: <FileCopy fontSize="large" />, // Orders icon
    label: "Orders",
    to: "/orders",
  },
  {
    icon: <CloudUpload fontSize="large" />, // Uploads icon
    label: "Uploads",
    to: "/uploads",
  },
  {
    icon: <Settings fontSize="large" />,
    label: "Settings",
    to: "/settings",
  },
];

export default menuItems;
