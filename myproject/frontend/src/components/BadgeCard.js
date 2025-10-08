import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function BadgeCard({ badges }) {
  const [expanded, setExpanded] = useState(false);

  // Sort badges by most recent first
  const sortedBadges = [...badges].sort(
    (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
  );
  const recentBadges = sortedBadges.slice(0, 3);

  // Helper: fix badge icon URL if it's internal
  const getBadgeUrl = (icon) =>
    icon.startsWith("http") ? icon : `https://leetcode.com${icon}`;

  return (
    <div className="relative w-full bg-gray-900/60 backdrop-blur-md text-white rounded-2xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Badges ({badges.length})</h2>
        <button
          onClick={() => setExpanded(true)}
          className="p-2 rounded-full hover:bg-gray-700 transition"
        >
          <ChevronDown />
        </button>
      </div>

      {/* Recent Badges */}
      <div className="flex justify-center gap-4">
        {recentBadges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img
              src={getBadgeUrl(badge.icon)}
              alt={badge.displayName}
              className="w-16 h-16 object-contain"
            />
            <p className="text-sm mt-2 text-gray-300">{badge.displayName}</p>
          </div>
        ))}
      </div>

      {/* Fullscreen Badge Overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-8 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          {/* Content wrapper */}
          <div className="mt-12 flex flex-col items-center">
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6 text-center top-0 bg-black/70 backdrop-blur-md w-full py-3 z-10">
              All Badges ({badges.length})
            </h2>

            {/* All badges grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {sortedBadges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={getBadgeUrl(badge.icon)}
                    alt={badge.displayName}
                    className="w-20 h-20 shadow-md hover:scale-105 transition object-contain"
                  />
                  <p className="text-sm mt-2 text-gray-300 text-center">
                    {badge.displayName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
