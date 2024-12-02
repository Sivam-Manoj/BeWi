import React from "react";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

interface AddEditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => void;
  initialValues?: {
    name: string;
    email: string;
    password: string;
    role: string;
  };
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues = { name: "", email: "", password: "", role: "" },
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" mb={3} textAlign="center">
          {initialValues.name ? "Edit User" : "Add New User"}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            {/* Password */}
            {!initialValues.name && (
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            )}

            {/* Role */}
            <Grid item xs={12}>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: "Role is required",
                  validate: (value) =>
                    value !== "default" || "Role is required",
                }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <Select {...field} value={field.value || "default"}>
                      <MenuItem value="default" disabled>
                        Select Role
                      </MenuItem>
                      <MenuItem value="super_admin">Super Admin</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                    {fieldState.error && (
                      <Typography
                        variant="caption"
                        color="error"
                        mt={0.5}
                        display="block"
                      >
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {initialValues.name ? "Save Changes" : "Add User"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEditUserModal;
