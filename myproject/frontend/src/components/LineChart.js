import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    chart: { type: "line", height: 350, toolbar: { show: false } },
    stroke: { curve: "smooth" },
    series: [
      { name: "Distribution", data: [3000, 3200, 2800, 3500, 4000, 4500] },
    ],
    xaxis: { categories: ["1", "2", "3", "4", "5", "6"] },
  };

  return (
    <Chart options={options} series={options.series} type="line" height={350} />
  );
};

export default LineChart;
