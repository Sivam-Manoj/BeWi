import React, { useState } from "react";
import { Drawer, IconButton, List, useMediaQuery } from "@mui/material";
import {
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  Menu as MenuIcon,
} from "@mui/icons-material";
import clsx from "clsx";
import { useTrail, animated } from "@react-spring/web";
import menuItems from "../../data/menuItems";
import { MenuItem } from "./MenuItem";
import { useDispatch } from "react-redux";
import { toggle } from "../../Store/slices/state/navbar/toggleSlice";

const VerticalNavbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State for expanded/collapsed menu
  const [isMobileOpen, setIsMobileOpen] = useState(false); // State for mobile drawer
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if screen is mobile
  const dispatch = useDispatch();
  // Handlers for toggling the menu
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    dispatch(toggle());
  };
  const toggleMobileDrawer = () => setIsMobileOpen(!isMobileOpen);

  // Separate main menu items and settings item
  const mainMenuItems = menuItems.filter((item) => item.label !== "Settings");
  const settingsItem = menuItems.find((item) => item.label === "Settings");

  // Animation for menu items
  const trail = useTrail(mainMenuItems.length, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 220, friction: 20, mass: 1 },
    delay: 200,
  });

  return (
    <>
      {/* Mobile Hamburger Icon */}
      {isMobile && (
        <IconButton onClick={toggleMobileDrawer} className="text-gray-800">
          <MenuIcon fontSize="medium" />
        </IconButton>
      )}

      {/* Drawer Component */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isMobileOpen : true}
        onClose={toggleMobileDrawer}
        anchor="left"
        className={clsx(
          "transition-all duration-300 ease-in-out shadow-lg",
          isExpanded ? "w-44" : "w-16"
        )}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#f5f5f5",
            color: "#000000",
            overflowX: "hidden",
            width: isExpanded || isMobile ? "11rem" : "4rem", // Dynamic width
            transition: "width 0.3s",
            borderRight: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Expand/Collapse Button (Desktop Only) */}
        {!isMobile && (
          <div className="flex items-end justify-end py-4">
            <IconButton onClick={toggleExpand} className="text-gray-800">
              {isExpanded ? (
                <KeyboardArrowLeftSharp fontSize="medium" />
              ) : (
                <KeyboardArrowRightSharp fontSize="medium" />
              )}
            </IconButton>
          </div>
        )}

        {/* Animated Main Menu Items */}
        <List>
          {trail.map((style, index) => (
            <animated.div key={index} style={style}>
              <MenuItem
                icon={mainMenuItems[index].icon}
                label={mainMenuItems[index].label}
                isExpanded={isExpanded || isMobile} // Adjust item visibility
                to={mainMenuItems[index].to}
              />
            </animated.div>
          ))}
        </List>

        {/* Settings Menu Item */}
        {settingsItem && (
          <div className="mt-auto mb-2">
            <MenuItem
              icon={settingsItem.icon}
              label={settingsItem.label}
              isExpanded={isExpanded || isMobile} // Adjust item visibility
              to={settingsItem.to}
            />
          </div>
        )}
      </Drawer>
    </>
  );
};

export default VerticalNavbar;
