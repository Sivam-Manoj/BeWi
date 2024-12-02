import {
  Settings,
  //StorageOutlined,
  Dashboard,
  PeopleOutline, // Employee Icon
  FileCopy, // Orders Icon
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
    icon: <PeopleOutline fontSize="large" />,
    label: "Employee",
    to: "/employee",
  },

  {
    icon: <FileCopy fontSize="large" />, // Orders icon
    label: "Orders",
    to: "/orders",
  },

  {
    icon: <Settings fontSize="large" />,
    label: "Settings",
    to: "/settings",
  },
];

export default menuItems;
