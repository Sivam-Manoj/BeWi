import { Link, useLocation } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import clsx from "clsx";
import { MenuItemProps } from "../../Types/props/MenuItemProps";

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  isExpanded,
  to,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Tooltip title={isExpanded ? "" : label} placement="right">
      <ListItemButton
        component={Link}
        to={to}
        className={clsx(
          "relative rounded-lg transition-all duration-200",
          isExpanded ? "justify-start" : "justify-center",
          isActive ? "" : "hover:bg-gray-200" // Light background on hover
        )}
        sx={{
          py: 1.5, // Reduce padding vertically
          px: isExpanded ? 2 : 0, // Adjust horizontal padding when collapsed
          minWidth: 0,
          maxWidth: "100%",
          alignItems: "center",
          borderRadius: "8px",
          mx: isExpanded ? 1 : 0,
          transition: "background-color 0.2s ease",
          backgroundColor: isActive ? "rgba(0, 148, 198, 0.1)" : "inherit", // Active light background
          "&:hover": {
            backgroundColor: "rgba(0, 148, 198, 0.1)", // Hover light blue
          },
        }}
      >
        <ListItemIcon
          className="min-w-0"
          sx={{
            justifyContent: "center",
            fontSize: "1.5rem", // Reduced icon size
            minWidth: "auto",
            marginLeft: isExpanded ? 1 : 2.5,
            color: "#0094c6", // Set icon color to blue
            "&:hover": {
              color: "#01bfff", // Icon hover color
            },
          }}
        >
          {icon}
        </ListItemIcon>
        {isExpanded && (
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontSize: "0.9rem", // Reduced text size
              fontWeight: "medium",
            }}
            sx={{
              color: "black", // Set text color to black
              ml: 1,
            }}
          />
        )}
        <span
          className={clsx(
            "absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300",
            isActive ? "w-1/2 bg-yellow-400" : "w-0"
          )}
          style={{
            height: "3px",
            borderRadius: "2px",
          }}
        />
      </ListItemButton>
    </Tooltip>
  );
};
