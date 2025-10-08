import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const LeetCodeStats = ({
  totalSolved,
  totalQuestions,
  easySolved,
  totalEasy,
  mediumSolved,
  totalMedium,
  hardSolved,
  totalHard,
  attempting = 0,
}) => {
  const percentage = Math.round((totalSolved / totalQuestions) * 100);

  const chartData = [
    { name: "Solved", value: percentage, fill: "#00C49F" },
    { name: "Remaining", value: 100 - percentage, fill: "#333" },
  ];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-100">
        LeetCode Progress
      </h2>

      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={15}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar minAngle={15} clockWise dataKey="value" />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold">{totalSolved}</h3>
            <p className="text-gray-400 text-sm">/ {totalQuestions}</p>
            <p className="text-green-400 text-sm mt-1">Solved</p>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="mt-6 flex flex-col gap-2 w-full text-center">
          <div className="flex justify-between bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-blue-400 font-medium">Easy</span>
            <span>
              {easySolved}/{totalEasy}
            </span>
          </div>
          <div className="flex justify-between bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-yellow-400 font-medium">Medium</span>
            <span>
              {mediumSolved}/{totalMedium}
            </span>
          </div>
          <div className="flex justify-between bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-red-400 font-medium">Hard</span>
            <span>
              {hardSolved}/{totalHard}
            </span>
          </div>
        </div>

        {/* Attempting / Remaining */}
        <p className="text-gray-400 text-sm mt-4">
          {attempting > 0
            ? `${attempting} Attempting`
            : `${totalQuestions - totalSolved} Remaining`}
        </p>
      </div>
    </div>
  );
};

export default LeetCodeStats;
