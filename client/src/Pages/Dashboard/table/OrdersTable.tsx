import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Card,
  CardContent,
} from "@mui/material";

// Define a type for the order data
type Order = {
  id: number;
  price: string;
  leftOver: string;
  startDate: string;
  endDate: string;
};

// Sample dynamic fetch (you can replace this with your actual API call)
const fetchOrders = async (): Promise<Order[]> => {
  // Simulating an API call
  return [
    {
      id: 1,
      price: "$100.00",
      leftOver: "$25.00",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
    },
    {
      id: 2,
      price: "$200.00",
      leftOver: "$50.00",
      startDate: "2024-02-01",
      endDate: "2024-02-20",
    },
    {
      id: 3,
      price: "$150.00",
      leftOver: "$30.00",
      startDate: "2024-03-01",
      endDate: "2024-03-10",
    },
    {
      id: 4,
      price: "$250.00",
      leftOver: "$75.00",
      startDate: "2024-04-01",
      endDate: "2024-04-10",
    },
    {
      id: 5,
      price: "$300.00",
      leftOver: "$90.00",
      startDate: "2024-05-01",
      endDate: "2024-05-15",
    },
    {
      id: 6,
      price: "$400.00",
      leftOver: "$100.00",
      startDate: "2024-06-01",
      endDate: "2024-06-10",
    },
    // Add more rows if needed
  ];
};

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Rows per page

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    getOrders();
  }, []);

  // Handle page change
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Get the current page's data slice
  const currentOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6">
      {/* Card Wrapper for table */}
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Orders Overview
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Left Over
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Start Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    End Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">{order.price}</TableCell>
                    <TableCell align="center">{order.leftOver}</TableCell>
                    <TableCell align="center">{order.startDate}</TableCell>
                    <TableCell align="center">{order.endDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination inside the card */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Align pagination to the right
              marginTop: 2,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersTable;
