import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Modal,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Notifications,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import ProfileModal from "./modal/ProfileModal";
import { logout } from "../../Store/slices/auth/auth";

const HorizontalMenu: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(false); // Light/Dark Theme state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // User Menu state
  const [openProfileModal, setOpenProfileModal] = useState(false); // Profile Modal state
  const [openNotificationModal, setOpenNotificationModal] = useState(false); // Notification Modal state
  const open = Boolean(anchorEl);
  const isToggle = useSelector((state: RootState) => state.toggle.isToggle);
  const dispatch = useDispatch();

  // Handle Theme change
  const handleThemeChange = () => {
    setTheme(!theme);
    if (theme) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Open User Menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close User Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    handleClose(); // Close menu after logout
  };

  // Open Profile Modal
  const handleOpenProfile = () => {
    setOpenProfileModal(true);
    handleClose();
  };

  // Close Profile Modal
  const handleCloseProfile = () => {
    setOpenProfileModal(false);
  };

  // Open Notification Modal
  const handleOpenNotification = () => {
    setOpenNotificationModal(true);
  };

  const handleCloseNotification = () => {
    setOpenNotificationModal(false);
  };

  const iconColor = theme ? "#fff" : "#333";

  const notifications = [
    { id: 1, message: "New order placed by John Doe", link: "/order/1" },
    {
      id: 2,
      message: "Your subscription is about to expire",
      link: "/subscription",
    },
    {
      id: 3,
      message: "System update completed successfully",
      link: "/updates",
    },
  ];

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          top: 5,
          left: isToggle ? 200 : 80,
          right: 0,
          width: isToggle ? "83%" : "91%",
          backgroundColor: "#f5f5f5", // Light background color
          borderRadius: 3,
        }}
        className="shadow-md"
      >
        <Toolbar className="flex justify-between items-center px-4 md:px-6">
          {/* Brand Name */}
          <Typography
            variant="h6"
            className="text-blue-500 text-4xl dark:text-white font-bold"
          >
            BeWi
          </Typography>

          {/* Right Side: User icon, Notifications button, and Theme toggle */}
          <div className="flex items-center space-x-4">
            {/* Notifications Button */}
            <IconButton
              color="inherit"
              sx={{ color: iconColor }}
              onClick={handleOpenNotification}
            >
              <Notifications />
            </IconButton>

            {/* Theme Toggle */}
            <IconButton
              onClick={handleThemeChange}
              color="inherit"
              sx={{ color: iconColor }}
            >
              {theme ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* User Icon */}
            <IconButton
              onClick={handleClick}
              color="inherit"
              sx={{ color: iconColor }}
            >
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            </IconButton>

            {/* User Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  width: "150px",
                },
              }}
            >
              <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu (Responsive) */}
      <div className="md:hidden flex items-center justify-between p-2">
        <IconButton
          onClick={handleClick}
          color="inherit"
          sx={{ color: iconColor }}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "150px",
            },
          }}
        >
          <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={openProfileModal}
        onClose={handleCloseProfile}
        aria-labelledby="user-profile-modal"
        aria-describedby="user-profile-modal-description"
      />

      {/* Notification Modal */}
      <Modal
        open={openNotificationModal}
        onClose={handleCloseNotification}
        aria-labelledby="notification-modal"
        aria-describedby="notification-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 2,
            padding: "2rem",
            maxWidth: "90%", // Limit width to 90% of the screen width
            maxHeight: "80vh", // Max height of the modal
            overflowY: "auto", // Enable scrolling for overflow content
            width: { xs: "90%", sm: 400, md: 500, lg: 600 }, // Tailwind/MUI mix for responsiveness
          }}
          className="md:w-auto sm:w-96 w-full max-w-full"
        >
          <Typography
            id="notification-modal"
            variant="h6"
            className="text-center mb-4 text-xl font-semibold"
          >
            Notifications
          </Typography>

          {/* Notification List */}
          <List>
            {notifications.map((notification) => (
              <div key={notification.id}>
                <ListItem>
                  <ListItemText primary={notification.message} />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    href={notification.link} // Link to full page for the notification
                  >
                    Go to Full Page
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          {/* Close Button */}
          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleCloseNotification}
              variant="contained"
              color="secondary"
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HorizontalMenu;
