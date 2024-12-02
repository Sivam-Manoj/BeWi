import useAuthRedirect from "../../hooks/useAuthRedirect";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/Piechart";
import OrdersTable from "./table/OrdersTable";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  useAuthRedirect();
  
  return (
    <div className="p-6">
      {/* Wrap the entire page content inside one Card */}
      <Card elevation={3}>
        <CardContent>
          {/* Title of the Dashboard */}
          <Typography variant="h5" gutterBottom>
            Dashboard
          </Typography>

          {/* Flex layout for the charts */}
          <div className="flex gap-6">
            {/* BarChart */}
            <div className="flex-1 min-w-[300px] max-w-[600px]">
              <BarChart />
            </div>

            {/* PieChart */}
            <div className="flex-1 min-w-[300px] max-w-[600px]">
              <PieChart />
            </div>
          </div>

          {/* Orders Table taking full width below the charts */}
          <div className="mt-6">
            <OrdersTable />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
