// ProgressCard.js
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import 'react-circular-progressbar/dist/styles.css';

const ProgressCard = () => {
  // Values for each ring
  const outerValue = 70; // Outer ring value
  const middleValue = 50; // Middle ring value
  const innerValue = 30; // Inner ring value

  // State to keep track of the value being hovered
  const [hoveredValue, setHoveredValue] = useState(null);

  // Common styles for hover effect and rounder stroke
  const commonStyles = {
    strokeLinecap: "round",
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: "200px", height: "200px" }}
    >
      {/* Display value on hover */}
      {hoveredValue !== null && (
        <div className="absolute text-white text-lg">{hoveredValue}</div>
      )}

      {/* Outer Ring */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onMouseEnter={() => setHoveredValue(outerValue)}
        onMouseLeave={() => setHoveredValue(null)}
      >
        <CircularProgressbar
          value={outerValue}
          styles={buildStyles({
            ...commonStyles,
            trailColor: "#e0e0e0",
            pathColor: "#ff6f61",
            strokeWidth: 10,
          })}
        />
      </div>

      {/* Middle Ring */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "180px",
          height: "180px",
        }}
        onMouseEnter={() => setHoveredValue(middleValue)}
        onMouseLeave={() => setHoveredValue(null)}
      >
        <CircularProgressbar
          value={middleValue}
          styles={buildStyles({
            ...commonStyles,
            trailColor: "#e0e0e0",
            pathColor: "#1c9cd6",
            strokeWidth: 8,
          })}
        />
      </div>

      {/* Inner Ring */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "160px",
          height: "160px",
        }}
        onMouseEnter={() => setHoveredValue(innerValue)}
        onMouseLeave={() => setHoveredValue(null)}
      >
        <CircularProgressbar
          value={innerValue}
          styles={buildStyles({
            ...commonStyles,
            trailColor: "#e0e0e0",
            pathColor: "#2ecc71",
            strokeWidth: 6,
          })}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
