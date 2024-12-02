import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import useSession from "../../../hooks/session/useSession";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user?: { name: string; email: string }; // Optional user object
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, user }) => {
  const session = useSession();
  const user_name: string = String(session?.user?.name);
  const user_email: string = String(session?.user?.email);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-profile-modal"
      aria-describedby="user-profile-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          boxShadow: 24,
          borderRadius: 2,
          width: 300,
        }}
      >
        <Typography
          id="user-profile-modal"
          variant="h6"
          className="text-center"
        >
          User Profile
        </Typography>
        <Typography id="user-profile-modal-description" sx={{ mt: 2 }}>
          Name: {user?.name || user_name}
        </Typography>
        <Typography id="user-profile-modal-description" sx={{ mt: 1 }}>
          Email: {user?.email || user_email}
        </Typography>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
