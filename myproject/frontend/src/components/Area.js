import React from "react";
import Chart from "react-apexcharts";

export default function Area(props) {
  const options = {
    chart: {
      type: "area",
      height: 160,
      toolbar: { show: false },
      dropShadow: { enabled: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    series: [
      {
        name: "New users",
        show: false,
        data: Array.isArray(props.data) ? props.data : [1, 2, 3, 4],
      },
    ],
    xaxis: {
      show: false,
      categories: props.categories ? props.categories : [1, 2, 3, 4],
    },
  };

  return (
    <Chart options={options} series={options.series} type="area" height={160} />
  );
}
