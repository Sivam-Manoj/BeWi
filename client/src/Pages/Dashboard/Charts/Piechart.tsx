import React from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts"; // Import ApexCharts types

const PieChart: React.FC = () => {
  // Example data for orders and balance
  const data = {
    series: [30, 70], // 30% completed orders, 70% remaining (balance)
    options: {
      chart: {
        type: "pie", // Set chart type to pie
        height: 350,
      },
      labels: ["Completed Orders", "Balance"], // Labels for the pie chart
      colors: ["#34bfa3", "#ff6347"], // Green for completed, red for balance
      plotOptions: {
        pie: {
          donut: {
            size: "60%", // Make the pie chart a donut
          },
        },
      },
      title: {
        text: "Orders and Balance for 2023",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    } as ApexCharts.ApexOptions, // Explicitly cast options to ApexOptions
  };

  return (
    <div className="pie-chart-container">
      <Chart
        options={data.options}
        series={data.series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChart;
