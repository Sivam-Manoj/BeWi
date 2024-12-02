import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useGetEmployeeApiQuery } from "../../Store/api/employee/employeeSlice";
import AddEditUserModal from "./_components/AddEditUserModal";

const Employee = () => {
  const { data: employeesData = [] } = useGetEmployeeApiQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (row) => {
    setEditingUser(row);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    if (
      window.confirm(`Are you sure you want to delete user with ID: ${id}?`)
    ) {
      console.log(`Delete user with ID: ${id}`);
    }
  };

  const handleModalSubmit = (user) => {
    if (editingUser) {
      console.log("Editing user:", user);
    } else {
      console.log("Adding new user:", user);
    }
  };

  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditUser(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id)}
        />,
      ],
    },
  ];

  const rows = employeesData?.map((employee: any, index: number) => ({
    id: employee._id,
    index: index + 1,
    name: employee.username,
    email: employee.email,
    role: employee.role,
  }));

  return (
    <Card sx={{ m: 3, p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" component="div">
            Employee Management
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </Box>
      </CardContent>

      <AddEditUserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={
          editingUser || { name: "", email: "", password: "", role: "" }
        }
      />
    </Card>
  );
};

export default Employee;
