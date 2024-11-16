import React from "react";
import Chart from "react-apexcharts";

// Define your data and chart options
const BarChart: React.FC = () => {
  const data = {
    series: [
      {
        name: "Stock Price",
        data: [120, 150, 180, 130, 170, 200, 210], // Stock prices for 7 months
      },
    ],
    options: {
      chart: {
        type: "bar", // Bar chart type
        height: 350,
        toolbar: {
          show: false, // Hides the toolbar
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Horizontal bars
          columnWidth: "55%", // Bar width
          endingShape: "rounded", // Rounded bars
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July", // Monthly categories
        ],
      },
      yaxis: {
        title: {
          text: "Stock Price (USD)", // Y-axis title
        },
      },
      fill: {
        colors: ["#34bfa3"], // Bar color
      },
      title: {
        text: "Stock Prices Over the Months",
        align: "center", // Title alignment
        style: {
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
    } as ApexCharts.ApexOptions, // Explicitly cast options to ApexOptions
  };

  return (
    <div className="bar-chart-container">
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
