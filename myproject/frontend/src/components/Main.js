import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "flowbite";
import ProfileCard from "./ProfileCard";
import LoadingScreen from "./LoadingScreen";
import Area from "./Area";
import LeetCodeStats from "./LeetCodeStats";
import BadgeCard from "./BadgeCard";

export default function Main() {
  const { leetcode_id, codeforces_id, codechef_id } = useParams();
  const [loading, setLoading] = useState(true);

  // LeetCode States
  const [leetcodePastContests, setLeetcodePastContests] = useState([]);
  const [leetcodeRating, setLeetcodeRating] = useState(null);
  const [leetcodeRanking, setLeetcodeRanking] = useState(null);
  const [leetcodeContestsAttended, setLeetcodeContestsAttended] =
    useState(null);
  const [easySolved, seteasySolved] = useState(null);
  const [totalEasy, settotalEasy] = useState(null);
  const [mediumSolved, setmediumSolved] = useState(null);
  const [totalMedium, settotalMedium] = useState(null);
  const [hardSolved, sethardSolved] = useState(null);
  const [totalHard, settotalHard] = useState(null);
  const [totalSolved, settotalSolved] = useState(null);
  const [totalQuestions, settotalQuestions] = useState(null);
  const [badges, setbadges] = useState([]);

  // CodeChef & Codeforces States
  const [codechefPastContests, setCodechefPastContests] = useState([]);
  const [codechefRating, setCodechefRating] = useState(null);
  const [codechefRanking, setCodechefRanking] = useState(null);
  const [codechefContestsAttended, setCodechefContestsAttended] =
    useState(null);
  const [codeforcesPastContests, setCodeforcesPastContests] = useState([]);
  const [codeforcesRating, setCodeforcesRating] = useState(null);
  const [codeforcesRanking, setCodeforcesRanking] = useState(null);
  const [codeforcesContestsAttended, setCodeforcesContestsAttended] =
    useState(null);

  useEffect(() => {
    const fetchLeetcode = async () => {
      const response = await fetch(
        `https://leetcode-stats.tashif.codes/${leetcode_id}/contests`
      );
      const data = await response.json();
      const contestData = data.contestHistory
        .filter((c) => c.attended)
        .map((c) => ({
          time: c.contest.startTime,
          rating: Math.round(c.rating),
        }));
      setLeetcodePastContests(contestData);
      setLeetcodeRating(Math.round(data.rating));
      setLeetcodeContestsAttended(contestData.length);
      setLeetcodeRanking(data.globalRanking);
    };

    const fetchLeetcodeQuestions = async () => {
      const response = await fetch(
        `https://leetcode-stats.tashif.codes/${leetcode_id}`
      );
      const data = await response.json();
      seteasySolved(data.easySolved);
      setmediumSolved(data.mediumSolved);
      sethardSolved(data.hardSolved);
      settotalEasy(data.totalEasy);
      settotalMedium(data.totalMedium);
      settotalHard(data.totalHard);
      settotalSolved(data.totalSolved);
      settotalQuestions(data.totalQuestions);
    };

    const fetchLeetcodeBadges = async () => {
      const response = await fetch(
        `https://leetcode-stats.tashif.codes/${leetcode_id}/badges`
      );
      const data = await response.json();
      setbadges(data.badges);
    };

    const fetchCodechef = async () => {
      const response = await fetch(
        `https://codechef-api.vercel.app/handle/${codechef_id}`
      );
      const data = await response.json();
      const contestData = data.ratingData.map((c) => ({
        time: c.end_date,
        rating: Math.round(c.rating),
      }));
      setCodechefPastContests(contestData);
      setCodechefRating(Math.round(data.currentRating));
      setCodechefContestsAttended(contestData.length);
      setCodechefRanking(data.countryRank);
    };

    const fetchCodeforces = async () => {
      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${codeforces_id}`
      );
      const data = await response.json();
      const contestData = data.result.map((c) => ({
        time: c.ratingUpdateTimeSeconds,
        rating: Math.round(c.newRating),
      }));
      const last = data.result[data.result.length - 1];
      setCodeforcesPastContests(contestData);
      setCodeforcesRating(last.newRating);
      setCodeforcesContestsAttended(data.result.length);
      setCodeforcesRanking(last.rank);
    };

    Promise.all([
      fetchLeetcode(),
      fetchLeetcodeQuestions(),
      fetchLeetcodeBadges(),
      fetchCodechef(),
      fetchCodeforces(),
    ])
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [leetcode_id, codeforces_id, codechef_id]);

  if (loading) return <LoadingScreen />;

  // Derived data
  const leetcodeRatings = leetcodePastContests.map((i) => i.rating);
  const leetcodeTimes = leetcodePastContests.map((i) =>
    new Date(i.time * 1000).toLocaleDateString()
  );
  const codechefRatings = codechefPastContests.map((i) => i.rating);
  const codechefTimes = codechefPastContests.map((i) => i.time);
  const codeforcesRatings = codeforcesPastContests.map((i) => i.rating);
  const codeforcesTimes = codeforcesPastContests.map((i) =>
    new Date(i.time * 1000).toLocaleDateString()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white min-h-screen overflow-auto">
      {/* LEFT SIDEBAR */}
      <div className="col-span-1 flex flex-col justify-start items-center space-y-6 p-6 bg-blue-900/20 backdrop-blur-md border-r border-blue-800/30">
        <ProfileCard />
        <LeetCodeStats
          totalSolved={totalSolved}
          totalQuestions={totalQuestions}
          easySolved={easySolved}
          totalEasy={totalEasy}
          mediumSolved={mediumSolved}
          totalMedium={totalMedium}
          hardSolved={hardSolved}
          totalHard={totalHard}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-3 p-8 flex flex-col space-y-8">
        <h1 className="text-4xl font-bold text-center tracking-wide text-blue-300 mb-4">
          Coding Dashboard
        </h1>

        <BadgeCard badges={badges} />

        {/* Platform Stats Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "LeetCode",
              rating: leetcodeRating,
              attended: leetcodeContestsAttended,
              rank: leetcodeRanking,
              times: leetcodeTimes,
              data: leetcodeRatings,
            },
            {
              title: "CodeChef",
              rating: codechefRating,
              attended: codechefContestsAttended,
              rank: codechefRanking,
              times: codechefTimes,
              data: codechefRatings,
            },
            {
              title: "Codeforces",
              rating: codeforcesRating,
              attended: codeforcesContestsAttended,
              rank: codeforcesRanking,
              times: codeforcesTimes,
              data: codeforcesRatings,
            },
          ].map((site, i) => (
            <div
              key={i}
              className="bg-blue-800/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-blue-700/20 transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-300 mb-3">
                {site.title}
              </h2>
              <Area categories={site.times} data={site.data} />
              <div className="mt-4 text-sm text-gray-300 space-y-1">
                <p>
                  Rating:{" "}
                  <span className="font-semibold text-white">
                    {site.rating}
                  </span>
                </p>
                <p>
                  Contests Attended:{" "}
                  <span className="font-semibold text-white">
                    {site.attended}
                  </span>
                </p>
                <p>
                  Rank:{" "}
                  <span className="font-semibold text-white">{site.rank}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
