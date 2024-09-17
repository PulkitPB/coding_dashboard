import React, { useState, useEffect } from "react";
import "flowbite";
import Chart from "react-apexcharts";

import Area from "./Area";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import ProgressCard from "./ProgressCard";
export default function Main() {
  const [leetcodePastContests, setleetcodePastContests] = useState([]);
  const [leetcodeRating, setleetcodeRating] = useState(null);
  const [leetcodeRanking, setleetcodeRanking] = useState(null);
  const [leetcodecontestsattended, setleetcodecontestsattended] =
    useState(null);

  {
    /*leetcode*/
  }
  useEffect(() => {
    fetch("https://alfa-leetcode-api.onrender.com/bhardwajpulkit910/contest/") // Adjust the path based on your file location
      .then((response) => response.json())
      .then((data) => {
        // Assuming your JSON has the following structure
        const rating = data.contestRating;
        const contestData = data.contestParticipation.map((c) => ({
          time: c.contest.startTime,
          rating: c.rating,
        }));

        setleetcodePastContests(contestData);
        setleetcodeRating(rating);
        setleetcodecontestsattended(data.contestAttend);
        setleetcodeRanking(data.contestGlobalRanking);
      })
      .catch((error) => console.error("Error loading data:", error));

    fetch("https://codeforces.com/api/user.rating?handle=pulkit_bhardwaj") // Adjust the path based on your file location
      .then((response) => response.json())
      .then((data) => {
        // Assuming your JSON has the following structure
        const codeforcesRating = data.result[-1].newRating;
        const contestData = data.result.map((c) => ({
          time: c.ratingUpdateTimeSeconds,
          rating: c.newRating,
        }));

        setcodeforcesPastContests(contestData);
        setcodeforcesRating(codeforcesRating);
        setcodeforcescontestsattended(data.result.length);
        setcodeforcesRanking(data.result[-1].rank);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  const leetcoderatings = leetcodePastContests.map((item) => item.rating);
  const leetcodetimes = leetcodePastContests.map((item) => {
    const date = new Date(item.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  });
  {
    /*codeforces*/
  }
  const [codeforcesPastContests, setcodeforcesPastContests] = useState([]);
  const [codeforcesRating, setcodeforcesRating] = useState(null);
  const [codeforcesRanking, setcodeforcesRanking] = useState(null);
  const [codeforcescontestsattended, setcodeforcescontestsattended] =
    useState(null);
  const codeforcesratings = codeforcesPastContests.map((item) => item.rating);
  const codeforcestimes = codeforcesPastContests.map((item) => {
    const date = new Date(item.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  });
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 bg-gradient-to-r from-blue-900 to-blue-800"
      style={{ overflow: "auto" }}
    >
      {/* USER */}
      <div className="col-span-1 min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 p-6"></div>
      {/* STATS */}

      <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 p-6 col-span-3">
        <div className="text-white text-center mb-8">
          <h1 className="text-3xl font-bold">CODING DASHBOARD</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Cards */}
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl">Leetcode</h2>
            <div className="my-4">
              <Area categories={leetcodetimes} data={leetcoderatings} />
            </div>
            <p>Rating: {leetcodeRating}</p>
            <p>Attended: {leetcodecontestsattended}</p>
            <p>Rank: {leetcodeRanking}</p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl">Codechef</h2>
            <div className="my-4">
              <Area categories={leetcodetimes} data={leetcoderatings} />
            </div>
            <p>Rating: {leetcodeRating}</p>
            <p>Attended: {leetcodecontestsattended}</p>
            <p>Rank: {leetcodeRanking}</p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl">Codeforces</h2>
            <div className="my-4">
              <Area categories={codeforcestimes} data={codeforcesratings} />
            </div>
            <p>Rating: {codeforcesRating}</p>
            <p>Attended: {codeforcescontestsattended}</p>
            <p>Rank: {codeforcesRanking}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl mb-4">Progress</h2>
            <ProgressCard />
          </div>
        </div>
      </div>
    </div>
  );
}
