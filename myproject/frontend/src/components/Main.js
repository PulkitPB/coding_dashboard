import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "flowbite";
import Chart from "react-apexcharts";
import ProfileCard from "./ProfileCard";

import Area from "./Area";
// import BarChart from "./BarChart";
// import LineChart from "./LineChart";
import ProgressCard from "./ProgressCard";
export default function Main() {
  // console.log("HELLO");
  const leetcode_id = useParams()["leetcode_id"];
  const codeforces_id = useParams()["codeforces_id"];
  const codechef_id = useParams()["codechef_id"];
  // console.log(codechef_id);
  const [leetcodePastContests, setleetcodePastContests] = useState([]);
  const [leetcodeRating, setleetcodeRating] = useState(null);
  const [leetcodeRanking, setleetcodeRanking] = useState(null);
  const [leetcodecontestsattended, setleetcodecontestsattended] =
    useState(null);
  const [codechefPastContests, setcodechefPastContests] = useState([]);
  const [codechefRating, setcodechefRating] = useState(null);
  const [codechefRanking, setcodechefRanking] = useState(null);
  const [codechefcontestsattended, setcodechefcontestsattended] =
    useState(null);
  {
    /*leetcode*/
  }
  useEffect(() => {
    fetch(
      "https://alfa-leetcode-api.onrender.com/"
        .concat(leetcode_id)
        .concat("/contest/")
    ) // Adjust the path based on your file location
      .then((response) => response.json())
      .then((data) => {
        // Assuming your JSON has the following structure
        const rating = data.contestRating;
        const contestData = data.contestParticipation.map((c) => ({
          time: c.contest.startTime,
          rating: c.rating,
        }));

        setleetcodePastContests(contestData);
        setleetcodeRating(Math.round(rating));
        setleetcodecontestsattended(data.contestAttend);
        setleetcodeRanking(data.contestGlobalRanking);
      })
      .catch((error) => console.error("Error loading data:", error));
    fetch("https://codechef-api.vercel.app/handle/".concat(codechef_id)) // Adjust the path based on your file location
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming your JSON has the following structure
        // console.log(data.result[data.result.length - 1]);
        const codechefRating = data.currentRating;
        const contestData = data.ratingData.map((c) => ({
          time: c.end_date,
          rating: c.rating,
        }));

        setcodechefPastContests(contestData);
        setcodechefRating(Math.round(codechefRating));
        setcodechefcontestsattended(data.ratingData.length);
        setcodechefRanking(data.countryRank);
      })
      .catch((error) => console.error("Error loading data:", error));

    fetch(
      "https://codeforces.com/api/user.rating?handle=".concat(codeforces_id)
    ) // Adjust the path based on your file location
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming your JSON has the following structure
        // console.log(data.result[data.result.length - 1]);
        const codeforcesRating = data.result[data.result.length - 1].newRating;
        const contestData = data.result.map((c) => ({
          time: c.ratingUpdateTimeSeconds,
          rating: c.newRating,
        }));

        setcodeforcesPastContests(contestData);
        setcodeforcesRating(Math.round(codeforcesRating));
        setcodeforcescontestsattended(data.result.length);
        setcodeforcesRanking(data.result[data.result.length - 1].rank);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  const leetcoderatings = leetcodePastContests.map((item) => item.rating);
  const leetcodetimes = leetcodePastContests.map((item) => {
    const date = new Date(item.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  });
  const codechefratings = codechefPastContests.map((item) => item.rating);
  const codecheftimes = codechefPastContests.map((item) => {
    // const date = new Date(item.time * 1000);
    // const formattedDate = date.toLocaleDateString("en-US");
    return item.time;
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
      <div className="col-span-1 min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 p-6">
        <ProfileCard />
      </div>
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
            <p className="font-bold text-lg mt-2">Rating: {leetcodeRating}</p>
            <p className="font-bold text-lg mt-2">
              Attended: {leetcodecontestsattended}
            </p>
            <p className="font-bold text-lg mt-2">Rank: {leetcodeRanking}</p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl">Codechef</h2>
            <div className="my-4">
              <Area categories={codecheftimes} data={codechefratings} />
            </div>
            <p className="font-bold text-lg mt-2">Rating: {codechefRating}</p>
            <p className="font-bold text-lg mt-2">
              Attended: {codechefcontestsattended}
            </p>
            <p className="font-bold text-lg mt-2">Rank: {codechefRanking}</p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl">Codeforces</h2>
            <div className="my-4">
              <Area categories={codeforcestimes} data={codeforcesratings} />
            </div>
            <p className="font-bold text-lg mt-2">Rating: {codeforcesRating}</p>
            <p className="font-bold text-lg mt-2">
              Attended: {codeforcescontestsattended}
            </p>
            <p className="font-bold text-lg mt-2">Rank: {codeforcesRanking}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
