import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "flowbite";
export default function Home() {
  const navigate = useNavigate();
  const [handles, setHandles] = useState({
    leetcode: "",
    codeforces: "",
    codechef: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/home/${handles.leetcode}/${handles.codeforces}/${handles.codechef}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Enter Your Handles
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="LeetCode Username"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={handles.leetcode}
            onChange={(e) =>
              setHandles({ ...handles, leetcode: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Codeforces Handle"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={handles.codeforces}
            onChange={(e) =>
              setHandles({ ...handles, codeforces: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="CodeChef Username"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={handles.codechef}
            onChange={(e) =>
              setHandles({ ...handles, codechef: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-lg font-semibold"
          >
            View Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
