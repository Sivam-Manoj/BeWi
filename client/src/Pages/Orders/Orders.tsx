import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddNewOrders from "./_components/AddNewOrders"; // Import the modal component

// Sample Data
const sampleOrders = [
  { id: 1, orderDate: "2024-12-01", description: "Order for electronics" },
  { id: 2, orderDate: "2024-12-02", description: "Groceries and supplies" },
  { id: 3, orderDate: "2024-12-03", description: "Furniture delivery" },
];

const Orders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  // Handle edit action
  const handleEdit = (id: number) => {
    console.log(`Edit order with id: ${id}`);
    // Add edit logic here
  };

  // Handle delete action
  const handleDelete = (id: number) => {
    console.log(`Delete order with id: ${id}`);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  // Handle modal submission
  const handleAddNewOrder = (newOrder: {
    orderDate: string;
    description: string;
  }) => {
    const newId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1; // Generate new ID
    const updatedOrders = [
      ...orders,
      {
        id: newId,
        orderDate: newOrder.orderDate,
        description: newOrder.description,
      },
    ];
    setOrders(updatedOrders);
    setModalOpen(false); // Close modal after submission
  };

  // Columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "orderDate", headerName: "Order Date", width: 150 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Box className="flex gap-2">
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className="p-6">
      {/* Card for Orders Table */}
      <Card className="shadow-lg">
        <CardHeader
          title="Orders"
          className="bg-blue-500 text-white"
          action={
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              className="bg-blue-700 hover:bg-blue-800"
            >
              Add New Order
            </Button>
          }
        />
        <CardContent>
          <Box className="h-[400px]">
            <DataGrid
              rows={orders}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              className="bg-white"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add New Orders Modal */}
      <AddNewOrders
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddNewOrder}
      />
    </Box>
  );
};

export default Orders;
