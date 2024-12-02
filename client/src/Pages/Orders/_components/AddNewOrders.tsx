import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface FormInputs {
  description: string;
  date: Date | null;
  file?: File | null;
}

interface AddNewOrdersProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { orderDate: string; description: string }) => void;
}

const AddNewOrders: React.FC<AddNewOrdersProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset, // Import reset function
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: { description: "", date: null, file: null },
  });

  const file = watch("file");

  // Dropzone for file upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => setValue("file", acceptedFiles[0]),
  });

  const handleFormSubmit = (data: FormInputs) => {
    const formattedDate = data.date
      ? data.date.toISOString().split("T")[0]
      : "";
    onSubmit({
      orderDate: formattedDate,
      description: data.description,
    });
  };

  // Handle Cancel button click to reset form fields
  const handleCancel = () => {
    reset(); // Reset the form fields to their default values
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center bg-blue-600 text-white px-6 py-4">
        <Typography variant="h6" className="font-medium">
          Add New Order
        </Typography>
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="px-8 py-6 bg-gray-50 mt-5">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            {/* File Upload */}
            <Grid item xs={12}>
              <Box
                {...getRootProps()}
                className={`border-dashed border-2 p-6 rounded-md cursor-pointer transition-all ${
                  isDragActive
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <input {...getInputProps()} />
                {file ? (
                  <Typography className="text-center font-medium text-gray-700">
                    {file.name}
                  </Typography>
                ) : (
                  <Typography className="text-center text-gray-500">
                    Drag and drop an Excel file here, or click to select one
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Date Picker */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Select Order Date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.date,
                        helperText: errors.date?.message,
                        className: "mb-4", // Add gap for DatePicker
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    className="mb-4" // Add gap for Description field
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions className="flex justify-end px-8 py-4 bg-gray-50">
        <Button
          onClick={handleCancel} // Use the handleCancel function
          variant="outlined"
          color="error"
          className="mr-4"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          color="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewOrders;
