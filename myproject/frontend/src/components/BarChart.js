import React from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const options = {
    chart: { type: "bar", height: 350, toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 10, horizontal: false } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    series: [{ name: "Daily Production", data: [54, 47, 33, 56, 83, 79] }],
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    yaxis: { title: { text: "Percentage (%)" } },
  };

  return (
    <Chart options={options} series={options.series} type="bar" height={350} />
  );
};

export default BarChart;
