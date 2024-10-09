import React from "react";
import Chart from "react-apexcharts";

export default function Area(props) {
  const options = {
    chart: {
      type: "area",
      height: 200,
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
    stroke: { curve: "straight", colors: ["#ceee2b"] },
    series: [
      {
        name: "Rating",
        show: false,
        data: Array.isArray(props.data) ? props.data : [1, 2, 3, 4],
      },
    ],
    xaxis: {
      categories: props.categories ? props.categories : [1, 2, 3, 4],
      labels: {
        show: false, // This hides the x-axis labels
      },
    },
  };

  return (
    <Chart options={options} series={options.series} type="area" height={200} />
  );
}
